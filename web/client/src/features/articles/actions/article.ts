"use server";

import { getFetch } from "@/lib/fetch";

import { ArticleTabType, ArticleType } from "@/types/article";

export type FetchArticlesAPIResponse = {
  data: {
    articles: ArticleType[];
    message: string;
  };
  status: number;
};

export const fetchArticlesAPI = async ({
  languageStatus,
  keyword,
  offset = "1",
  platformIdList,
  tab,
}: {
  languageStatus: string;
  keyword?: string;
  offset?: string;
  platformIdList: Array<string>;
  tab: ArticleTabType;
}): Promise<FetchArticlesAPIResponse> => {
  let url = `http://localhost:80/api/articles/?offset=${offset}&tab=${tab}`;
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
    tagName: "articles",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      articles: data.articles as ArticleType[],
      message: "success",
    },
    status,
  };
};

export type FetchArticleByArticleAndPlatformUrlAPIResponse = {
  data: {
    article: ArticleType | undefined;
    message: string;
  };
  status: number;
};

export const fetchArticleByArticleAndPlatformUrlAPI = async ({
  articleUrl,
  platformUrl,
}: {
  articleUrl: string;
  platformUrl: string;
}): Promise<FetchArticleByArticleAndPlatformUrlAPIResponse> => {
  let url = `http://localhost:80/api/articles/article-platform-url?articleUrl=${articleUrl}&platformUrl=${platformUrl}`;
  const response = await getFetch({
    url,
    tagName: "articles/byArticleAndPlatformUrl",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      article: data.article as ArticleType | undefined,
      message: "success",
    },
    status,
  };
};
