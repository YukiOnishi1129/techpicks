"use server";

import { getFetch } from "@/lib/fetch";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

export const fetchFavoriteArticleFoldersAPI = async () => {
  const url = "http://localhost:80/api/favorite-article-folders";
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
        message: data.message,
      },
      status,
    };
  }

  if (status === 404) {
    return {
      data: {
        favoriteArticleFolders: [],
        message: data.message,
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
