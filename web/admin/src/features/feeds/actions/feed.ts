"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import {
  FeedType,
  FetchFeedAPIResponse,
  FetchFeedsAPIResponse,
} from "@/types/feed";

type FetchFeedsAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
  rssUrl?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
};

export const fetchFeedsAPI = async ({
  offset = "1",
  keyword,
  language,
  platformSiteType,
  siteUrl,
  rssUrl,
  platformId,
  categoryId,
  trendPlatformType,
}: FetchFeedsAPIRequest): Promise<FetchFeedsAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/feeds/?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (language) {
    url += `&language=${language}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }
  if (siteUrl) {
    url += `&siteUrl=${siteUrl}`;
  }
  if (rssUrl) {
    url += `&rssUrl=${rssUrl}`;
  }
  if (platformId) {
    url += `&platformId=${platformId}`;
  }
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (trendPlatformType) {
    url += `&trendPlatformType=${trendPlatformType}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "feeds",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;
  return {
    data: {
      feeds: data.feeds as Array<FeedType>,
      message: "success",
    },
    status,
  };
};

type FetchFeedsCountAPIRequest = {
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  siteUrl?: string;
  rssUrl?: string;
  platformId?: string;
  categoryId?: string;
  trendPlatformType?: string;
};

export const fetchFeedsCountAPI = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
  rssUrl,
  platformId,
  categoryId,
  trendPlatformType,
}: FetchFeedsCountAPIRequest): Promise<FetchCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/feeds/count/?dummy=dummy`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (language) {
    url += `&language=${language}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }
  if (siteUrl) {
    url += `&siteUrl=${siteUrl}`;
  }
  if (rssUrl) {
    url += `&rssUrl=${rssUrl}`;
  }
  if (platformId) {
    url += `&platformId=${platformId}`;
  }
  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (trendPlatformType) {
    url += `&trendPlatformType=${trendPlatformType}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "feeds/count",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  return {
    data: {
      count: data.count as number,
      message: "success",
    },
    status,
  };
};

export const fetchFeedByIdAPI = async (
  id: string
): Promise<FetchFeedAPIResponse> => {
  const res = await getFetch({
    url: `${process.env.WEB_DOMAIN}/api/feeds/${id}`,
    tagName: "feeds",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  if (!data.feed) {
    return {
      data: {
        feed: data.feed as FeedType,
        message: "Feed not found",
      },
      status: 404,
    };
  }

  return {
    data: {
      feed: data.feed as FeedType,
      message: "success",
    },
    status,
  };
};
