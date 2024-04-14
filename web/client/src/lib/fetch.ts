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
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: [tagName] },
    cache: cacheType,
  });
};

type PostFetchArgs = {
  url: string;
  tagName: string;
  body: Record<string, unknown>;
  cacheType: RequestCache;
};

export const postFetch = async ({
  url,
  tagName,
  body,
  cacheType = "no-store",
}: PostFetchArgs) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { tags: [tagName] },
    cache: cacheType,
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
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: [tagName] },
    cache: cacheType,
  });
};
