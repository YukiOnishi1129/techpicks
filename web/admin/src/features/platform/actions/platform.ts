"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import { FetchPlatformAPIResponse, PlatformType } from "@/types/platform";

type FetchPlatformsAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
};

export const fetchPlatformsAPI = async ({
  offset = "1",
  keyword,
  language,
}: FetchPlatformsAPIRequest): Promise<FetchPlatformAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platform/?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (language) {
    url += `&language=${language}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "platforms",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  return {
    data: {
      platforms: data.platforms as Array<PlatformType>,
      message: "success",
    },
    status,
  };
};

type FetchPlatformsCountAPIRequest = {
  keyword?: string;
  language?: string;
};

export const fetchPlatformsCountAPI = async ({
  keyword,
  language,
}: FetchPlatformsCountAPIRequest): Promise<FetchCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platform/count/`;
  if (keyword) {
    url += `?keyword=${keyword}`;
  }
  if (language) {
    url += `?language=${language}`;
  }

  const res = await getFetch({
    url: url,
    tagName: "platforms/count",
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
