"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";

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
          message: data.message,
        },
        status,
      };
    }

    if (status === 404) {
      return {
        data: {
          message: data.message,
        },
        status,
      };
    }

    return {
      data: {
        count: data.count,
        message: data.message,
      },
      status,
    };
  };
