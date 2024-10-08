# Who's That Pokemon? Game

Guess the pokemon. Inspired by the animated series intermission which asked viewers "Who's that Pokemon?".

## Develop Locally

- Clone the repo
- Install with `yarn`
- Run the dev server: `yarn dev`

## Overview

- Game uses the free pokemon api `https://pokeapi.co/`.
- App mounts and `GET` the pokemon species list. This endpoint isn't rate limited but it is cached locally to minimize hits.
- A random pokemon is selected and a `POST` to the pokemon graphql beta endpoint returns the sprite. This endpoint has a rate limit of 100 per hour.
- User inputs the guess into the text field.
- Game continues until all attempts are exhausted. Correct guesses increase the user score.
- After the game ends a mock `PUT` request updates the high score. The high score isn't displayed but it is stored in `localStorage`. The mock request uses a free service from wiremock.
- An error boundary wraps the app and the `appState` is intended to pass the `ERROR` to it.
- Clicking the `?` button will show/hide debug information, including the answer to the hidden pokemon.
- RoadMap
  - Define types for API responses
  - Add tests
  - Use the `isError` prop to put the app into an error state
  - Handle different errors and customize the message in the error boundary
  - Animated loading state (i.e. spinner)
  - Display the user high score.
  - Fancier scoring calculator
  - Autocomplete the guess input
  - Hints

## Starter Template Info

The app uses a React + TypeScript + Vite starter template.

**Expanding the ESLint configuration**

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
