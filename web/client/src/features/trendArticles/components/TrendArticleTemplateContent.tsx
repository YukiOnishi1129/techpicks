import { User } from "@supabase/supabase-js";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";

import { LanguageStatus } from "@/types/language";

import { TrendArticleList } from "./TrendArticleList";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";

type TrendArticleListContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
};

export const TrendArticleTemplateContent = async ({
  languageStatus,
  keyword,
  platformIdList,
  user,
}: TrendArticleListContentProps) => {
  const tab = "trend";
  const res = await fetchTrendArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
    tab,
  });
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI();

  return (
    <TrendArticleList
      user={user}
      initialTrendArticles={res.data.trendArticles}
      favoriteArticleFolders={
        resFavoriteArticleFolders.data.favoriteArticleFolders
      }
      languageStatus={languageStatus}
      keyword={keyword}
      platformIdList={platformIdList}
      tab={tab}
      fetchTrendArticles={fetchTrendArticlesAPI}
    />
  );
};
