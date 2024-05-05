"use server";

import { PlatformType } from "@/types/platform";

export const fetchPlatformAPI = async ({
  languageStatus = "0",
  platformSiteType,
}: {
  languageStatus?: string;
  platformSiteType?: string;
}) => {
  let url = `${process.env.WEB_DOMAIN}/api/platforms/?languageStatus=${languageStatus}`;
  if (platformSiteType) {
    url += `&platformSiteType=${platformSiteType}`;
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["platforms"] },
    cache: "no-store",
  });
  const data = await response.json();

  return data.platforms as PlatformType[];
};
