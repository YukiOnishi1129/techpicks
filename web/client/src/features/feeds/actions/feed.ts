"use server";

import { getFetch } from "@/lib/fetch";

import { FeedType } from "@/types/feed";

export type FetchFeedsAPIResponse = {
  data: {
    feeds: FeedType[];
    message: string;
  };
  status: number;
};

export const fetchFeedsAPI = async ({
  offset = "1",
  keyword,
  platformSiteType,
}: {
  offset?: string;
  keyword?: string;
  platformSiteType?: string;
}): Promise<FetchFeedsAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/feeds?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }
  const response = await getFetch({
    url,
    tagName: "feeds",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      feeds: data.feeds as FeedType[],
      message: data.message as string,
    },
    status: status,
  };
};

type FetchAllFeedAPIRequest = {
  feedIdList?: Array<string>;
};

export const fetchAllFeedAPI = async ({
  feedIdList,
}: FetchAllFeedAPIRequest): Promise<FetchFeedsAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/feeds/all?dummy=1`;

  if (feedIdList) {
    const feedIdPath = feedIdList.map((feedId) => `&feedId=${feedId}`).join("");
    url += feedIdPath;
  }
  const response = await getFetch({
    url,
    tagName: "feeds/all",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  return {
    data: {
      feeds: data.feeds as FeedType[],
      message: data.message as string,
    },
    status: status,
  };
};

type FetchFeedByIdAPIResponse = {
  data: {
    feed: FeedType | undefined;
    message: string;
  };
  status: number;
};

export const fetchFeedByIdAPI = async (
  id: string
): Promise<FetchFeedByIdAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/feeds/${id}`;
  const response = await getFetch({
    url,
    tagName: "feed",
    cacheType: "no-store",
  });
  const data = await response.json();
  const status = response.status;

  if (status === 404) {
    return {
      data: {
        feed: undefined,
        message: data.message as string,
      },
      status: status,
    };
  }

  return {
    data: {
      feed: data.feed as FeedType,
      message: data.message as string,
    },
    status: status,
  };
};
