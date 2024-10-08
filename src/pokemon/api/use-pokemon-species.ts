import { useCallback, useEffect, useState } from "react";

type PokemonResults = {}[];

type Cache = { data?: PokemonResults[] };

function usePokemonSpecies() {
  const [cache, setCache] = useState<Cache>({});
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const getPokemonSpecies = useCallback(async () => {
    const url = "https://pokeapi.co/api/v2/pokemon-species?limit=1025";
    const request = await fetch(url);
    const response = await request.json();
    return response.results;
  }, []);

  useEffect(() => {
    if (!cache.data) {
      console.info("Caching data..");
      getPokemonSpecies()
        .then((data) => {
          setCache({ data });
        })
        .catch(() => {
          setError(true);
          setErrorMsg("Service Unavailable");
        });
    }
  }, [cache?.data]);

  return { data: cache.data, isError, errorMsg };
}

export default usePokemonSpecies;
