import { useCallback, useEffect, useState } from "react";

function usePokemonSprite(value: string | undefined) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPokemonSprite = useCallback(async () => {
    const url = "https://beta.pokeapi.co/graphql/v1beta";
    const request = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `
        {
            pokemon_v2_pokemonsprites(limit: 1, where: {pokemon_v2_pokemon: {name: {_eq: "${value}"}}}) {
              pokemon_v2_pokemon {
                name
                id
                pokemon_v2_pokemonsprites {
                  sprites(path: "other.official-artwork.front_default")
                  pokemon_id
                }
              }
            }
          }
        `,
      }),
    });
    const response = await request.json();
    return response.data;
  }, [value]);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      getPokemonSprite()
        .then((item) => {
          const sprite =
            item.pokemon_v2_pokemonsprites[0].pokemon_v2_pokemon
              .pokemon_v2_pokemonsprites[0].sprites;
          if (item.pokemon_v2_pokemonsprites) {
            setData(sprite);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [value]);

  return { data, isError, isLoading };
}

export default usePokemonSprite;
