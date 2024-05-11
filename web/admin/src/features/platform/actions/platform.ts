"use server";

import { getFetch } from "@/lib/fetch";

import { FetchPlatformAPIResponse, PlatformType } from "@/types/platform";

type FetchPlatformsAPIRequest = {
  offset?: string;
  keyword?: string;
};

export const fetchPlatformsAPI = async ({
  offset = "1",
  keyword,
}: FetchPlatformsAPIRequest): Promise<FetchPlatformAPIResponse> => {
  let url = `${process.env.WEB_DOMAIN}/api/platform/?offset=${offset}`;
  if (keyword) {
    url += `&keyword=${keyword}`;
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
