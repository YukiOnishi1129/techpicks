import { headers } from "next/headers";

type GetFetchArgs = {
  url: string;
  tagName: string;
  cacheType: RequestCache;
};

export const getFetch = async ({
  url,
  tagName,
  cacheType = "no-store",
}: GetFetchArgs) => {
  return fetch(url, {
    headers: headers(),
    next: { tags: [tagName] },
    cache: cacheType,
  });
};

type PostFetchArgs = {
  url: string;
  body: Record<string, unknown>;
};

export const postFetch = async ({ url, body }: PostFetchArgs) => {
  console.log(url);
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers(),
    },
    body: JSON.stringify(body),
  });
};

type DeleteFetchArg = {
  url: string;
  tagName: string;
  cacheType: RequestCache;
};

export const deleteFetch = async ({
  url,
  tagName,
  cacheType = "no-store",
}: DeleteFetchArg) => {
  return fetch(url, {
    method: "DELETE",
    headers: headers(),
    next: { tags: [tagName] },
    cache: cacheType,
  });
};
