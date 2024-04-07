"use server";

import { ArticleType } from "@/types/article";

export const fetchArticleAPI = async ({
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
  let url = `http://localhost:80/api/articles/?offset=${offset}`;
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
    next: { tags: ["articles"] },
    cache: "no-store",
  });
  const data = await response.json();

  return data.articles as ArticleType[];
};
