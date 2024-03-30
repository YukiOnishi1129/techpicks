"use client";

import { FC } from "react";

import { GetArticleParams } from "@/features/articles/repository/article";

import { Article } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";

type ArticleListProps = {
  initialArticles: Array<Article>;
  languageStatus: LanguageStatus;
  fetchArticles: ({
    platformId,
    languageStatus,
    offset,
    sort,
    sortColum,
  }: GetArticleParams) => Promise<Article[]>;
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
