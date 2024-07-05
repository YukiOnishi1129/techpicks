import { FC } from "react";

import { getUser } from "@/features/users/actions/user";

import { TrendArticleSwiper } from "./TrendArticleSwiper";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";

type TrendDashboardTemplateProps = {
  keyword?: string;
  platformIdList: Array<string>;
  tab: string;
};

export const TrendDashboardTemplate: FC<TrendDashboardTemplateProps> = async ({
  keyword,
  platformIdList,
  tab,
}) => {
  const user = await getUser();

  const enTrendArticleRes = await fetchTrendArticlesAPI({
    languageStatus: "2",
    keyword,
    platformIdList,
    tab: "trend",
  });
  const jpTrendArticleRes = await fetchTrendArticlesAPI({
    languageStatus: "1",
    keyword,
    platformIdList,
    tab: "trend",
  });

  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  return (
    <div className="">
      <div className="fixed z-10 hidden w-full items-end justify-end bg-card px-4 md:flex md:justify-between">
        <h1 className="my-4 text-2xl  font-bold">Trend</h1>
      </div>
      <div className="fixed z-10 flex h-16 w-full items-end justify-end bg-card px-4 md:hidden md:justify-between" />
      <div className="hidden h-16 md:block" />
      {/* TODO: select box */}

      <TrendArticleSwiper
        keyword={keyword}
        platformIdList={platformIdList}
        enTrendArticles={enTrendArticleRes.data.trendArticles}
        jpTrendArticles={jpTrendArticleRes.data.trendArticles}
        favoriteArticleFolders={
          resFavoriteArticleFolders.data.favoriteArticleFolders
        }
        user={user}
      />
    </div>
  );
};
