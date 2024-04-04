import { FC } from "react";

import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { fetchArticleAPI } from "../actions/article";

type ArticleListProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
};

export const ArticleListTemplate: FC<ArticleListProps> = async ({
  languageStatus,
  keyword,
}: ArticleListProps) => {
  const articles = await fetchArticleAPI({
    languageStatus: languageStatus.toString(),
    keyword,
  });
  return (
    <>
      {languageStatus === 1 && (
        <ArticleList
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          fetchArticles={fetchArticleAPI}
        />
      )}
      {languageStatus === 2 && (
        <ArticleList
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          fetchArticles={fetchArticleAPI}
        />
      )}
    </>
  );
};
