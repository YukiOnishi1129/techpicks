"use client";

import { User } from "@supabase/supabase-js";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";
import { TrendArticleType } from "@/types/trendArticle";

import { TrendArticleList } from "./TrendArticleList";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";

type TrendArticleListContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  trendArticles: Array<TrendArticleType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user: User | undefined;
};

export const TrendArticleTemplateContent = ({
  languageStatus,
  keyword,
  platformIdList,
  user,
  trendArticles,
  favoriteArticleFolders,
}: TrendArticleListContentProps) => {
  return (
    <TrendArticleList
      user={user}
      initialTrendArticles={trendArticles}
      favoriteArticleFolders={favoriteArticleFolders}
      languageStatus={languageStatus}
      keyword={keyword}
      platformIdList={platformIdList}
      tab={"trend"}
      fetchTrendArticles={fetchTrendArticlesAPI}
    />
  );
};
