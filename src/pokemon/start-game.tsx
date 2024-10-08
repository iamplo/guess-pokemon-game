import { useCallback, useEffect, useState } from "react";
import usePokemonSpecies from "./api/use-pokemon-species";
import InputGuess from "./input-guess";
import { Feedback, GuessFormElement, Status } from "./types";
import GameFeedback from "./game-feedback";
import usePokemonSprite from "./api/use-pokemon-sprite";
import Sprite from "./sprite";
import useUpdateHighScore from "./api/use-update-high-score";

type Props = {
  appState: Status;
  setAppState: (state: Status) => void;
};

const CONFIG = {
  defaultAttemps: 3,
};

function StartGame({ setAppState, appState }: Props) {
  const { data } = usePokemonSpecies();

  const { mutate } = useUpdateHighScore();

  const [msg, setMsg] = useState<Feedback>();

  const [debug, setDebug] = useState(false);

  const [attempts, setAttempts] = useState(CONFIG.defaultAttemps);

  const [score, setScore] = useState(0);

  const [pokemonName, setPokemonName] = useState<string | undefined>();

  const { data: sprite, isLoading: isSpriteLoading } =
    usePokemonSprite(pokemonName);

  const onStart = () => {
    reset();
    const random = Math.floor(Math.random() * data?.length!) + 1;
    // @ts-expect-error
    const select = data?.[random].name!;
    setPokemonName(select);
  };

  const isGuessCorrect = (value: string) => {
    return value.trim().toLowerCase() === pokemonName;
  };

  const reset = () => {
    setAppState("IN_PROGRESS");
    setAttempts(CONFIG.defaultAttemps);
    setScore(0);
    setMsg(undefined);
  };

  const onNext = () => {
    setAppState("IN_PROGRESS");
    setMsg(undefined);
    const random = Math.floor(Math.random() * data?.length!) + 1;
    // @ts-expect-error-ignore
    const name = data?.[random].name!;
    setPokemonName(name);
  };

  const onSubmit = (ev: React.FormEvent<GuessFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();

    const formData = new FormData(ev.currentTarget);

    const guess = formData.get("guess");

    if (!guess) {
      return;
    }

    if (isGuessCorrect(guess as string)) {
      setMsg("CORRECT_GUESS");
      setScore((prev) => (prev += 10));
      setAppState("END");
    } else {
      const guessesLeft = attempts - 1;
      setMsg("WRONG_GUESS");
      setAttempts(guessesLeft);
      ev.currentTarget.reset();
    }
  };

  const updateHighScore = useCallback((value: number) => {
    mutate(value)
      .then(() => {
        const storedScore = localStorage.getItem("highScore");
        if (storedScore) {
          const high = Math.max(+storedScore, score);
          localStorage.setItem("highScore", high.toString());
        } else {
          localStorage.setItem("highScore", value.toString());
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (attempts === 0) {
      setAppState("END");
      setMsg("NO_GUESSES_LEFT");
      updateHighScore(score);
    }
  }, [attempts, score]);

  return (
    <div>
      {(appState === "IN_PROGRESS" || appState === "END") && (
        <>
          <div>Score: {score}</div>
          <div>Attempts Left: {attempts}</div>
        </>
      )}

      {appState === "READY" && (
        <button className="button--center" onClick={onStart}>
          Start Game
        </button>
      )}

      <GameFeedback attempts={attempts} feedback={msg} score={score} />

      <div className="sprite__loader">
        {isSpriteLoading ? (
          <div>Loading...</div>
        ) : (
          <>{sprite && <Sprite appState={appState} sprite={sprite} />}</>
        )}
      </div>

      {appState === "IN_PROGRESS" && attempts > 0 && sprite && (
        <InputGuess isLoading={isSpriteLoading} onSubmit={onSubmit} />
      )}

      {appState === "END" && (
        <div className="reveal">
          <div className="reveal__name">{pokemonName}</div>
          {attempts > 0 && <button onClick={onNext}>Next</button>}
          {attempts === 0 && <button onClick={onStart}>New Game</button>}
        </div>
      )}

      <button onClick={() => setDebug(!debug)}>?</button>

      {debug && (
        <pre className="debug">
          {JSON.stringify(
            {
              debug: {
                appState,
                pokemonName,
                sprite,
              },
            },
            null,
            2
          )}
        </pre>
      )}
    </div>
  );
}

export default StartGame;
