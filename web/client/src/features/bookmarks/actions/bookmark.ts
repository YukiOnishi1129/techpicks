"use server";

import { BookmarkType } from "@/types/bookmark";

export const fetchBookmarkListAPI = async ({
  languageStatus,
  keyword,
  offset = "1",
  platformIdList,
}: {
  languageStatus: string;
  keyword?: string;
  offset?: string;
  platformIdList: Array<string>;
}) => {
  let url = `http://localhost:80/api/bookmarks/?offset=${offset}`;
  if (languageStatus) {
    url += `&languageStatus=${languageStatus}`;
  }
  if (keyword) {
    url += `&keyword=${keyword}`;
  }
  if (platformIdList.length) {
    const platformIdPath = platformIdList
      .map((platformId) => `&platformId=${platformId}`)
      .join("");
    url += platformIdPath;
  }
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["bookmarks"] },
    cache: "no-store",
  });
  const data = await response.json();

  return data.bookmarks as BookmarkType[];
};
