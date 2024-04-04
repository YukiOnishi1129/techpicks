"use server";

import { ArticleType } from "@/types/article";

export const fetchArticleAPI = async ({
  languageStatus,
  offset = "1",
}: {
  languageStatus: string;
  offset?: string;
}) => {
  const response = await fetch(
    `http://localhost:80/api/articles/?offset=${offset}&languageStatus=${languageStatus}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["articles"] },
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data.articles as ArticleType[];
};
