"use server";

import { getFetch } from "@/lib/fetch";

import { FetchCountAPIResponse } from "@/types/api";
import {
  FetchPlatformAPIResponse,
  FetchPlatformsAPIResponse,
  PlatformType,
} from "@/types/platform";

type FetchPlatformsAPIRequest = {
  offset?: string;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  operationStatus?: string;
};

export const fetchPlatformsAPI = async ({
  offset = "1",
  keyword,
  language,
  platformSiteType,
  operationStatus,
}: FetchPlatformsAPIRequest): Promise<FetchPlatformsAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platforms/?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (language) {
    url += `&language=${language}`;
  }
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }
  if (operationStatus) {
    url += `&status=${operationStatus}`;
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
  siteUrl?: string;
  operationStatus?: string;
};

export const fetchPlatformsCountAPI = async ({
  keyword,
  language,
  platformSiteType,
  siteUrl,
  operationStatus,
}: FetchPlatformsCountAPIRequest): Promise<FetchCountAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platforms/count/?dummy=dummy`;
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
  if (operationStatus) {
    url += `&status=${operationStatus}`;
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

export const fetchPlatformByIdAPI = async (
  id: string
): Promise<FetchPlatformAPIResponse> => {
  const res = await getFetch({
    url: `${process.env.WEB_DOMAIN}/api/platforms/${id}/`,
    tagName: "platform",
    cacheType: "no-store",
  });
  const data = await res.json();
  const status = res.status;

  return {
    data: {
      platform: data.platform as PlatformType,
      message: "success",
    },
    status,
  };
};
