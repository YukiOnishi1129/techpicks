"use server";

import { getFetch } from "@/lib/fetch";

import { FetchPlatformAPIResponse, PlatformType } from "@/types/platform";

export const fetchPlatformsAPI =
  async (): Promise<FetchPlatformAPIResponse> => {
    const url = new URL(`${process.env.WEB_DOMAIN}/api/platform`);
    const res = await getFetch({
      url: url.toString(),
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
