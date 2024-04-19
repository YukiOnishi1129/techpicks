"use server";

import { getFetch } from "@/lib/fetch";

import { FeedType } from "@/types/feed";

export const fetchFeedsAPI = async () => {
  const url = `http://localhost:80/api/feed`;
  const response = await getFetch({
    url,
    tagName: "feed",
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

export const fetchFeedByIdAPI = async (id: string) => {
  const url = `http://localhost:80/api/feed/${id}`;
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
