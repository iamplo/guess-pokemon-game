import { GuessFormElement } from "./types";

type Props = {
  autoFillData?: string[];
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<GuessFormElement>) => void;
};

function InputGuess({ isLoading, onSubmit }: Props) {
  return (
    <div className="guess">
      <form onSubmit={onSubmit}>
        <input type="text" name="guess" id="guess" required />
        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputGuess;
