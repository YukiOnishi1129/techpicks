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
  platformSiteType,
  platformIdList,
  tab,
}: {
  languageStatus: string;
  keyword?: string;
  offset?: string;
  platformSiteType?: string;
  platformIdList: Array<string>;
  tab: ArticleTabType;
}): Promise<FetchArticlesAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/articles/?offset=${offset}&tab=${tab}`;
  if (languageStatus) {
    url += `&languageStatus=${languageStatus}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
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

export const fetchArticlesByFeedIdsAPI = async ({
  feedIds,
  keyword,
  offset = "1",
}: {
  feedIds: Array<string>;
  keyword?: string;
  offset?: string;
}): Promise<FetchArticlesAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/articles/feed-ids/?offset=${offset}}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (feedIds.length) {
    const feedIdPath = feedIds.map((feedId) => `&feedId=${feedId}`).join("");
    url += feedIdPath;
  }

  const response = await getFetch({
    url,
    tagName: "articles/feedIds",
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

type FetchPrivateArticlesByArticleUrlAPIRequest = {
  articleUrl: string;
};

export const fetchPrivateArticlesByArticleUrlAPI = async ({
  articleUrl,
}: FetchPrivateArticlesByArticleUrlAPIRequest): Promise<FetchArticlesAPIResponse> => {
  {
    let url = `${process.env.WEB_DOMAIN}/api/articles/private/article-url?articleUrl=${articleUrl}`;
    const response = await getFetch({
      url,
      tagName: "articles/private/article-url",
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
  }
};

export type FetchArticleAPIResponse = {
  data: {
    article: ArticleType | undefined;
    message: string;
  };
  status: number;
};

export const fetchArticleByIdAPI = async (
  id: string
): Promise<FetchArticleAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/articles/${id}`;
  const response = await getFetch({
    url,
    tagName: "article",
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

export const fetchArticleByArticleAndPlatformUrlAPI = async ({
  articleUrl,
  platformUrl,
}: {
  articleUrl: string;
  platformUrl: string;
}): Promise<FetchArticleAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/articles/article-platform-url?articleUrl=${articleUrl}&platformUrl=${platformUrl}`;
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

export const fetchPrivateArticleByIdAPI = async (
  id: string
): Promise<FetchArticleAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/articles/private/${id}`;
  const response = await getFetch({
    url,
    tagName: "articles/private",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      article: data.article as ArticleType | undefined,
      message: data.message as string,
    },
    status,
  };
};
