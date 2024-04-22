import { useCallback } from "react";

type GetFetchArgs = {
  url: string;
  tagName: string;
  cacheType: RequestCache;
};

export const useFetch = () => {
  const getFetch = useCallback(
    async ({ url, tagName, cacheType = "no-store" }: GetFetchArgs) => {
      return fetch(url, {
        next: { tags: [tagName] },
        cache: cacheType,
      });
    },
    []
  );

  return { getFetch };
};
