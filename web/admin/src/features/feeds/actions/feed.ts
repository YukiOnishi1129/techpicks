"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import { FeedType, FetchFeedsAPIResponse } from "@/types/feed";

type FetchFeedsAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const fetchFeedsAPI = async ({
  offset = "1",
  keyword,
  language,
  platformSiteType,
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
};

export const fetchFeedsCountAPI = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
  rssUrl,
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
