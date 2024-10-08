import { Feedback } from "./types";

type Props = {
  attempts: number;
  feedback: Feedback;
  score: number;
};

function GameFeedback({ feedback }: Props) {
  if (feedback === "WRONG_GUESS") {
    return (
      <div className="feedback feedback--wrong">
        That is incorrect. Try again.
      </div>
    );
  }
  if (feedback === "CORRECT_GUESS") {
    return <div className="feedback feedback--correct">Correct!</div>;
  }
  if (feedback === "NO_GUESSES_LEFT") {
    return (
      <div className="feedback feedback--end">
        😭 You ran out of attempts! 😭
      </div>
    );
  }
  return null;
}

export default GameFeedback;
