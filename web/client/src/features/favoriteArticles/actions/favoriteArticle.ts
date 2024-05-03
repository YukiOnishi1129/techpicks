"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import { FavoriteArticleType } from "@/types/favoriteArticle";

type FetchFavoriteArticleAPIResponse = {
  data: {
    favoriteArticle?: FavoriteArticleType;
    message: string;
  };
  status: number;
};

export const fetchFavoriteArticleAPI = async (
  id: string
): Promise<FetchFavoriteArticleAPIResponse> => {
  const url = `http://localhost:80/api/favorite-articles/${id}`;
  const response = await getFetch({
    url,
    tagName: "favorite-articles",
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

  return {
    data: {
      favoriteArticle: data.favoriteArticle as FavoriteArticleType,
      message: data.message as string,
    },
    status,
  };
};

export const fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAPI =
  async ({
    favoriteArticleFolderId,
    articleId,
  }: {
    favoriteArticleFolderId: string;
    articleId: string;
  }): Promise<FetchCountAPIResponse> => {
    const url = `http://localhost:80/api/favorite-articles/count/by-favorite-article-folder-and-article-id?favoriteArticleFolderId=${favoriteArticleFolderId}&articleId=${articleId}`;
    const response = await getFetch({
      url,
      tagName:
        "favorite-articles/count/by-favorite-article-folder-and-article-id",
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
        count: data.count as number,
        message: data.message,
      },
      status,
    };
  };
