"use server";

import { Platform } from "@prisma/client";

export const fetchPlatformAPI = async ({
  languageStatus = "1",
  platformType,
}: {
  languageStatus?: string;
  platformType?: string;
}) => {
  let url = `http://localhost:80/api/platforms/?languageStatus=${languageStatus}`;
  if (platformType) {
    url += `&platformType=${platformType}`;
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["platforms"] },
    cache: "no-store",
  });
  const data = await response.json();

  return data.platforms as Platform[];
};
