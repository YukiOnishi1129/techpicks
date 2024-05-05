"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import { FavoriteArticleType } from "@/types/favoriteArticle";
import {
  FetchFavoriteArticlesByFavoriteArticleFolderIdAPIArg,
  FetchFavoriteArticlesAPIResponse,
  FetchFavoriteArticleAPIResponse,
} from "@/types/favoriteArticleFolder";

export const fetchFavoriteArticlesByFavoriteArticleFolderIdAPI = async ({
  favoriteArticleFolderId,
  offset = "1",
  keyword,
}: FetchFavoriteArticlesByFavoriteArticleFolderIdAPIArg): Promise<FetchFavoriteArticlesAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/favorite-articles/favorite-article-folders/${favoriteArticleFolderId}?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  const response = await getFetch({
    url,
    tagName: "favorite-articles/favorite-article-folder-id",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        favoriteArticles: [],
        message: data.message as string,
      },
      status,
    };
  }

  return {
    data: {
      favoriteArticles: data.favoriteArticles as Array<FavoriteArticleType>,
      message: data.message as string,
    },
    status,
  };
};

type FetchFavoriteArticleCountByFolderIdAndArticleUrlAPIResponse = {
  articleUrl: string;
  favoriteArticleFolderId: string;
};

export const fetchFavoriteArticleCountByFolderIdAndArticleUrlAPI = async ({
  articleUrl,
  favoriteArticleFolderId,
}: FetchFavoriteArticleCountByFolderIdAndArticleUrlAPIResponse): Promise<FetchCountAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}//api/favorite-articles/favorite-article-folders/${favoriteArticleFolderId}/article-url?articleUrl=${articleUrl}`;
  const response = await getFetch({
    url,
    tagName: "favorite-articles/favorite-article-folder-id/article-url",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 401) {
    return {
      data: {
        count: 0,
        message: data.message as string,
      },
      status,
    };
  }

  return {
    data: {
      count: data.count as number,
      message: data.message as string,
    },
    status,
  };
};

export const fetchFavoriteArticleAPI = async (
  id: string
): Promise<FetchFavoriteArticleAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/favorite-articles/${id}`;
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

export const fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI =
  async ({
    favoriteArticleFolderId,
    articleId,
    articleUrl,
  }: {
    favoriteArticleFolderId: string;
    articleId: string;
    articleUrl: string;
  }): Promise<FetchCountAPIResponse> => {
    let url = `${process.env.WEB_DOMAIN}/api/favorite-articles/count/favorite-article-folders/${favoriteArticleFolderId}/article-id-and-url?articleId=${articleId}&articleUrl=${articleUrl}`;
    const response = await getFetch({
      url,
      tagName:
        "favorite-articles/count/favorite-article-folder/favorite-article-folder-id/article-id-and-url",
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
