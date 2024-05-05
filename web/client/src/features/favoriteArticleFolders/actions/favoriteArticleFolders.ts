"use server";

import { getFetch } from "@/lib/fetch";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type FetchFavoriteArticleFolderListAPIResponse = {
  data: {
    favoriteArticleFolders: FavoriteArticleFolderType[];
    message: string;
  };
  status: number;
};

type FetchFavoriteArticleFolderAPIRequest = {
  keyword?: string;
};

export const fetchFavoriteArticleFoldersAPI = async ({
  keyword,
}: FetchFavoriteArticleFolderAPIRequest): Promise<FetchFavoriteArticleFolderListAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/favorite-article-folders/`;
  if (keyword) {
    url += `?keyword=${keyword}`;
  }
  const response = await getFetch({
    url,
    tagName: "favorite-article-folders",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        favoriteArticleFolders: [],
        message: data.message as string,
      },
      status,
    };
  }

  if (status === 404) {
    return {
      data: {
        favoriteArticleFolders: [],
        message: data.message as string,
      },
      status,
    };
  }

  return {
    data: {
      favoriteArticleFolders:
        data.favoriteArticleFolders as FavoriteArticleFolderType[],
      message: data.message,
    },
    status,
  };
};

type FetchFavoriteArticleFolderAPIResponse = {
  data: {
    favoriteArticleFolder?: FavoriteArticleFolderType;
    message: string;
  };
  status: number;
};

export const fetchFavoriteArticleFolderByIdAPI = async (
  id: string
): Promise<FetchFavoriteArticleFolderAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/favorite-article-folders/${id}`;
  const response = await getFetch({
    url,
    tagName: "favorite-article-folder",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        message: data.message as string,
      },
      status,
    };
  }

  if (status === 404) {
    return {
      data: {
        message: data.message as string,
      },
      status,
    };
  }

  return {
    data: {
      favoriteArticleFolder:
        data.favoriteArticleFolder as FavoriteArticleFolderType,
      message: data.message as string,
    },
    status,
  };
};
