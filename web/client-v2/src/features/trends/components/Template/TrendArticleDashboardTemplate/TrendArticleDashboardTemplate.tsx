import Image from "next/image";
import { FC, Suspense } from "react";

import { SearchArticleDialog } from "@/features/articles/components/Dialog";
import { SkeltonArticleList } from "@/features/articles/components/List";
import { SelectArticlePageTab } from "@/features/articles/components/Tab";

import { ArticlesInput, FavoriteArticleFoldersInput } from "@/graphql/type";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/shared/constant/image";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { LanguageStatus } from "@/shared/types/language";

import { TrendArticleDashboardTemplateQuery } from "./TrendArticleDashboardTemplateQuery";
import { TrendArticleList } from "../../List";

type TrendArticleDashboardTemplateProps = {
  languageStatus?: LanguageStatus;
};

const TAB_LIST = {
  ENGLISH: "english",
  JAPANESE: "japanese",
};

export const TrendArticleDashboardTemplate: FC<
  TrendArticleDashboardTemplateProps
> = async ({ languageStatus = 2 }) => {
  const title = "Trend";
  const tab = "trend";
  const enInput: ArticlesInput = {
    first: 20,
    after: null,
    tab,
    languageStatus: 2,
  };
  const jpInput: ArticlesInput = {
    first: 20,
    after: null,
    tab,
    languageStatus: 1,
  };
  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: true,
  };

  return (
    <div>
      <div className="fixed z-10  w-[90%] items-end justify-end bg-card md:flex md:w-[70%] md:justify-between md:px-4">
        <h1 className="my-4 hidden text-2xl font-bold md:block">{title}</h1>
        <div className="h-2 w-full md:hidden" />
        <div className="h-16 w-full md:hidden">
          <SelectArticlePageTab />
        </div>
      </div>
      <div className=" h-16" />
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
          <PreloadQuery
            query={TrendArticleDashboardTemplateQuery}
            variables={{
              input: enInput,
              favoriteArticleFoldersInput,
            }}
          >
            <Suspense fallback={<SkeltonArticleList />}>
              <TrendArticleList languageStatus={2} tab={tab} />
            </Suspense>
          </PreloadQuery>
        </TabsContent>
        <TabsContent value={TAB_LIST.JAPANESE}>
          <PreloadQuery
            query={TrendArticleDashboardTemplateQuery}
            variables={{
              input: jpInput,
              favoriteArticleFoldersInput,
            }}
          >
            <Suspense fallback={<SkeltonArticleList />}>
              <TrendArticleList languageStatus={1} tab={tab} />
            </Suspense>
          </PreloadQuery>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchArticleDialog />
      </div>
    </div>
  );
};

const convertTab = (languageStatus: LanguageStatus) => {
  return languageStatus === 1 ? TAB_LIST.JAPANESE : TAB_LIST.ENGLISH;
};
