"use server";

import { getFetch } from "@/lib/fetch";

import { ArticleTabType } from "@/types/article";
import { TrendArticleType } from "@/types/trendArticle";

export type FetchTrendArticlesAPIResponse = {
  data: {
    trendArticles: TrendArticleType[];
    message: string;
  };
  status: number;
};

export const fetchTrendArticlesAPI = async ({
  languageStatus,
  keyword,
  offset = "1",
  platformIdList,
  tab,
  startTime,
  endTime,
}: {
  languageStatus: string;
  keyword?: string;
  offset?: string;
  platformIdList: Array<string>;
  tab: ArticleTabType;
  startTime?: string;
  endTime?: string;
}): Promise<FetchTrendArticlesAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/trend-articles/?offset=${offset}&tab=${tab}`;
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
  if (!!startTime && !!endTime) {
    url += `&startTime=${startTime}&endTime=${endTime}`;
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
      trendArticles: data.trendArticles as TrendArticleType[],
      message: "success",
    },
    status,
  };
};
