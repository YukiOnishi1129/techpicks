import Link from "next/link";
import { FC } from "react";
import { CiSearch } from "react-icons/ci";

import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { fetchArticleAPI } from "../actions/article";

type ArticleListProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const ArticleListTemplate: FC<ArticleListProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: ArticleListProps) => {
  const articles = await fetchArticleAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
  });
  const user = await getUser();
  return (
    <div className="w-auto">
      <div className="flex w-full items-end justify-between px-4">
        <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Today</h1>
        <div className="mb-4 mr-8 flex items-end">
          <Link className="mr-8" href="/article/search">
            <CiSearch size="36" />
          </Link>
        </div>
      </div>
      {languageStatus === 1 && (
        <ArticleList
          user={user}
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          fetchArticles={fetchArticleAPI}
        />
      )}
      {languageStatus === 2 && (
        <ArticleList
          user={user}
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          fetchArticles={fetchArticleAPI}
        />
      )}
    </div>
  );
};
