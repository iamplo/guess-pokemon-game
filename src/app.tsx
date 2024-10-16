import { useEffect, useState } from "react";
import usePokemonSpecies from "./pokemon/api/use-pokemon-species";
import ErrorBoundary from "./pokemon/error-boundary";
import StartGame from "./pokemon/start-game";
import { Status } from "./pokemon/types";
import "./app.css";

function App() {
  const { data } = usePokemonSpecies();

  const [status, setStatus] = useState<Status>("NOT_READY");

  const setGameState = (state: Status) => {
    setStatus(state);
  };

  useEffect(() => {
    if (data) {
      setStatus("READY");
    }
  }, [data]);

  return (
    <div className="game">
      <h1 className="james-cameron">Who&apos;s That Pokemon?</h1>
      <ErrorBoundary
        errorMsg="Service Unavailable"
        isError={status === "ERROR"}
      >
        {status !== "NOT_READY" && (
          <StartGame
            appState={status}
            setAppState={setGameState}
            data={data!}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
