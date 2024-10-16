export type Status = "NOT_READY" | "READY" | "IN_PROGRESS" | "END" | "ERROR";

export type Feedback =
  | "CORRECT_GUESS"
  | "WRONG_GUESS"
  | "NO_GUESSES_LEFT"
  | undefined;

export interface FormElements extends HTMLFormControlsCollection {
  guess: HTMLInputElement;
}

export interface GuessFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export type PokemonResults = object[];

export type Cache = { data?: PokemonResults[] };