import { FC } from "react";

import { Article } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";

type ArticleListProps = {
  initialArticles: Array<Article>;
  languageStatus: LanguageStatus;
  fetchArticles: ({
    languageStatus,
    offset,
  }: {
    languageStatus: string;
    offset: string;
  }) => Promise<Article[]>;
};

export const ArticleListTemplate: FC<ArticleListProps> = ({
  initialArticles,
  languageStatus,
  fetchArticles,
}: ArticleListProps) => {
  return (
    <ArticleList
      initialArticles={initialArticles}
      languageStatus={languageStatus}
      fetchArticles={fetchArticles}
    />
  );
};
