import { User } from "@supabase/supabase-js";
import { readFragment } from "gql.tada";
import Image from "next/image";
import { FC } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageStatus } from "@/types/language";

import { ENGLISH_IMAGE, JAPANESE_IMAGE } from "@/constant/image";
import { ArticlesInput, FavoriteArticleFoldersInput } from "@/graphql/type";

import { getTrendArticleDashboardTemplateQuery } from "./actGetTrendArticleDashboardTemplateQuery";
import { TrendArticleDashboardTemplateFragment } from "./TrendArticleDashboardTemplateFragment";
import { TrendArticleList } from "../../List";

type TrendArticleDashboardTemplateProps = {
  user: User;
  languageStatus?: LanguageStatus;
};

const TAB_LIST = {
  ENGLISH: "english",
  JAPANESE: "japanese",
};

export const TrendArticleDashboardTemplate: FC<
  TrendArticleDashboardTemplateProps
> = async ({ user, languageStatus = 2 }) => {
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
  };
  const { data, error } = await getTrendArticleDashboardTemplateQuery(
    enInput,
    jpInput,
    favoriteArticleFoldersInput
  );

  const fragment = readFragment(TrendArticleDashboardTemplateFragment, data);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="fixed z-10  w-[90%] items-end justify-end bg-card md:flex md:w-[70%] md:justify-between md:px-4">
        <h1 className="my-4 hidden text-2xl font-bold md:block">{title}</h1>
        <div className="h-2 w-full md:hidden" />
        <div className="h-16 w-full md:hidden">
          {/* <SelectArticlePageTab userId={user?.id} /> */}
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
          <TrendArticleList
            data={fragment.enArticles}
            favoriteArticleFolders={fragment.favoriteArticleFolders}
            user={user}
            languageStatus={2}
            feedIdList={[]}
            tab={tab}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.JAPANESE}>
          <TrendArticleList
            data={fragment.jpArticles}
            favoriteArticleFolders={fragment.favoriteArticleFolders}
            user={user}
            languageStatus={1}
            feedIdList={[]}
            tab={tab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const convertTab = (languageStatus: LanguageStatus) => {
  return languageStatus === 1 ? TAB_LIST.JAPANESE : TAB_LIST.ENGLISH;
};
