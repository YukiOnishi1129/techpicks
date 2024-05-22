"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import { FetchPlatformAPIResponse, PlatformType } from "@/types/platform";

type FetchPlatformsAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
};

export const fetchPlatformsAPI = async ({
  offset = "1",
  keyword,
  language,
  platformSiteType,
}: FetchPlatformsAPIRequest): Promise<FetchPlatformAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platform/?offset=${offset}`;
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
  platformSiteType?: string;
};

export const fetchPlatformsCountAPI = async ({
  keyword,
  language,
  platformSiteType,
}: FetchPlatformsCountAPIRequest): Promise<FetchCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platform/count/?dummy=dummy`;
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
