import Image from "next/image";
import { FC } from "react";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { SelectArticlePageTab } from "@/features/home/components/SelectArticlePageTab";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageStatus } from "@/types/language";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constant/image";

import { TrendArticleList } from "./TrendArticleList";
import { fetchTrendArticlesAPI } from "../actions/trendArticles";

type TrendDashboardTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

const TAB_LIST = {
  ENGLISH: "english",
  JAPANESE: "japanese",
};

export const TrendDashboardTemplate: FC<TrendDashboardTemplateProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
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
      <div className="fixed z-10  w-[90%] items-end justify-end bg-card md:flex md:w-[70%] md:justify-between md:px-4">
        <h1 className="my-4 hidden text-2xl font-bold md:block">Trend</h1>
        <div className="h-2 w-full md:hidden" />
        <div className="h-16 w-full md:hidden">
          <SelectArticlePageTab userId={user?.id} />
        </div>
      </div>
      <div className=" h-16 " />

      <Tabs defaultValue={convertTab(languageStatus)}>
        <TabsList className="fixed  z-10  mt-[-4px] w-[90%] pt-[4px] md:mt-[-10px] md:w-[70%] md:py-[10px]">
          <TabsTrigger className="w-1/2" value={TAB_LIST.ENGLISH}>
            <Image
              className="inline-block"
              src={ENGLISH_IMAGE}
              alt={"EN"}
              width={20}
              height={20}
            />
            <span className="ml-2 inline-block">En</span>
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value={TAB_LIST.JAPANESE}>
            <Image
              className="inline-block"
              src={JAPANESE_IMAGE}
              alt={"JP"}
              width={20}
              height={20}
            />
            <span className="ml-2 inline-block">Jp</span>
          </TabsTrigger>
        </TabsList>

        <div className="h-[40px]" />
        <TabsContent value={TAB_LIST.ENGLISH}>
          <TrendArticleList
            user={user}
            initialTrendArticles={enTrendArticleRes.data.trendArticles}
            favoriteArticleFolders={
              resFavoriteArticleFolders.data.favoriteArticleFolders
            }
            languageStatus={2}
            keyword={keyword}
            platformIdList={platformIdList}
            tab={"trend"}
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.JAPANESE}>
          <TrendArticleList
            user={user}
            initialTrendArticles={jpTrendArticleRes.data.trendArticles}
            favoriteArticleFolders={
              resFavoriteArticleFolders.data.favoriteArticleFolders
            }
            languageStatus={1}
            keyword={keyword}
            platformIdList={platformIdList}
            tab={"trend"}
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const convertTab = (languageStatus: LanguageStatus) => {
  return languageStatus === 1 ? TAB_LIST.JAPANESE : TAB_LIST.ENGLISH;
};
