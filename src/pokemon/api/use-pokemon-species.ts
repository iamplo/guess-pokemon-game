import { useCallback, useEffect, useState } from "react";
import { Cache } from "../types";

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
      getPokemonSpecies()
        .then((data) => {
          setCache({ data });
        })
        .catch(() => {
          setError(true);
          setErrorMsg("Service Unavailable");
        });
    }
  }, [cache?.data, getPokemonSpecies]);

  return { data: cache.data, isError, errorMsg };
}

export default usePokemonSpecies;
