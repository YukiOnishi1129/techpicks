import Image from "next/image";
import { FC } from "react";

import { SelectArticlePageTab } from "@/features/articles/components/Tab";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { ArticleKeyWordSearchDialog } from "@/features/search/components/articles/Dialog";
import { fetchTrendArticlesAPI } from "@/features/trendArticles/actions/trendArticles";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageStatus } from "@/types/language";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constant/image";

import { TrendArticleList } from "../List";

type TrendTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  feedIdList: Array<string>;
};

const TAB_LIST = {
  ENGLISH: "english",
  JAPANESE: "japanese",
};

export const TrendTemplate: FC<TrendTemplateProps> = async ({
  languageStatus,
  keyword,
  feedIdList,
}) => {
  const enTrendArticleRes = await fetchTrendArticlesAPI({
    languageStatus: "2",
    keyword,
    feedIdList,
    tab: "trend",
  });
  const jpTrendArticleRes = await fetchTrendArticlesAPI({
    languageStatus: "1",
    keyword,
    feedIdList,
    tab: "trend",
  });

  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  return (
    <div className="">
      <div className="fixed z-10  w-[90%] items-end justify-end bg-card md:flex md:w-[70%] md:justify-between md:px-4">
        <h1 className="my-4 hidden text-2xl font-bold md:block">Trend</h1>
        <div className="h-2 w-full md:hidden" />
        <div className="h-16 w-full md:hidden">
          <SelectArticlePageTab />
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
            initialTrendArticles={enTrendArticleRes.data.trendArticles}
            favoriteArticleFolders={
              resFavoriteArticleFolders.data.favoriteArticleFolders
            }
            languageStatus={2}
            keyword={keyword}
            feedIdList={feedIdList}
            tab={"trend"}
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.JAPANESE}>
          <TrendArticleList
            initialTrendArticles={jpTrendArticleRes.data.trendArticles}
            favoriteArticleFolders={
              resFavoriteArticleFolders.data.favoriteArticleFolders
            }
            languageStatus={1}
            keyword={keyword}
            feedIdList={feedIdList}
            tab={"trend"}
            fetchTrendArticles={fetchTrendArticlesAPI}
          />
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <ArticleKeyWordSearchDialog />
      </div>
    </div>
  );
};

const convertTab = (languageStatus: LanguageStatus) => {
  return languageStatus === 1 ? TAB_LIST.JAPANESE : TAB_LIST.ENGLISH;
};
