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
}: {
  offset?: string;
}): Promise<FetchFeedsAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/feeds?offset=${offset}`;
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

export const fetchAllFeedAPI = async (): Promise<FetchFeedsAPIResponse> => {
  const url = `${process.env.WEB_DOMAIN}/api/feeds/all`;
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
