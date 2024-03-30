import { FC } from "react";

import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { fetchArticleAPI } from "../actions/article";

type ArticleListProps = {
  languageStatus: LanguageStatus;
};

export const ArticleListTemplate: FC<ArticleListProps> = async ({
  languageStatus,
}: ArticleListProps) => {
  const articles = await fetchArticleAPI({
    languageStatus: languageStatus.toString(),
  });
  return (
    <>
      {languageStatus === 1 && (
        <ArticleList
          initialArticles={articles}
          languageStatus={languageStatus}
          fetchArticles={fetchArticleAPI}
        />
      )}
      {languageStatus === 2 && (
        <ArticleList
          initialArticles={articles}
          languageStatus={languageStatus}
          fetchArticles={fetchArticleAPI}
        />
      )}
    </>
  );
};
