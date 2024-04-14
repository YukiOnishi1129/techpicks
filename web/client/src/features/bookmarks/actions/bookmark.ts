"use server";

import { getFetch, postFetch } from "@/lib/fetch";

import { BookmarkType } from "@/types/bookmark";

export type FetchBookmarkListAPIResponse = {
  data: {
    bookmarks: BookmarkType[];
    message: string;
  };
  status: number;
};

export const fetchBookmarkListAPI = async ({
  languageStatus,
  keyword,
  offset = "1",
  platformIdList,
}: {
  languageStatus: string;
  keyword?: string;
  offset?: string;
  platformIdList: Array<string>;
}): Promise<FetchBookmarkListAPIResponse> => {
  let url = `http://localhost:80/api/bookmarks/?offset=${offset}`;
  if (languageStatus) {
    url += `&languageStatus=${languageStatus}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (platformIdList.length) {
    const platformIdPath = platformIdList
      .map((platformId) => `&platformId=${platformId}`)
      .join("");
    url += platformIdPath;
  }
  const response = await getFetch({
    url,
    tagName: "bookmarks",
    cacheType: "no-store",
  });
  const data = await response.json();

  return {
    data: {
      bookmarks: data.bookmarks as BookmarkType[],
      message: "success",
    },
    status: response.status,
  };
};

type FetchBookmarkCountAPIResponse = {
  data: {
    count?: number;
    message: string;
  };
  status: number;
};

export const fetchBookmarkCountByArticleIdAPI = async ({
  articleId,
}: {
  articleId: string;
}): Promise<FetchBookmarkCountAPIResponse> => {
  let url = `http://localhost:80/api/bookmarks/count/by-article-id/?articleId=${articleId}`;
  const response = await getFetch({
    url,
    tagName: "bookmarks/count",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      count: data?.count as number | undefined,
      message: data.message as string,
    },
    status,
  };
};

export const fetchBookmarkCountByArticleUrl = async ({
  articleUrl,
}: {
  articleUrl: string;
}): Promise<FetchBookmarkCountAPIResponse> => {
  let url = `http://localhost:80/api/bookmarks/count/by-article-url/?articleUrl=${articleUrl}`;
  const response = await getFetch({
    url,
    tagName: "bookmarks/count",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      count: data?.count as number | undefined,
      message: data.message as string,
    },
    status,
  };
};

type CreateBookmarkAPIRequest = {
  title: string;
  description: string;
  articleId?: string;
  articleUrl: string;
  publishedAt?: Date;
  thumbnailURL: string;
  platformId?: string;
  platformName?: string;
  platformUrl?: string;
  platformFaviconUrl?: string;
  isEng: boolean;
};

type CreateBookmarkAPIResponse = {
  data: {
    id: string;
    message: string;
  };
  status: number;
};

export const createBookmarkAPI = async ({
  title,
  description,
  articleId,
  articleUrl,
  publishedAt,
  thumbnailURL,
  platformId,
  platformName,
  platformUrl,
  platformFaviconUrl,
  isEng,
}: CreateBookmarkAPIRequest): Promise<CreateBookmarkAPIResponse> => {
  let url = `http://localhost:80/api/bookmarks/`;
  const response = await postFetch({
    url,
    tagName: "bookmarks/create",
    body: {
      title,
      description,
      articleId,
      articleUrl,
      publishedAt,
      thumbnailURL,
      platformId,
      platformName,
      platformUrl,
      platformFaviconUrl,
      isEng,
    },
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      id: data.id as string,
      message: data.message as string,
    },
    status,
  };
};

export const deleteBookmarkAPI = async ({ id }: { id: string }) => {
  let url = `http://localhost:80/api/bookmarks/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["bookmarks/delete"] },
    cache: "no-store",
  });
  const data = await response.json();

  return data;
};
