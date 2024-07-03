import { FC } from "react";

import { TrendArticleTemplateContent } from "@/features/trendArticles/components/TrendArticleTemplateContent";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageBadge } from "@/components/ui/badge";

type TrendDashboardTemplateProps = {
  keyword?: string;
  platformIdList: Array<string>;
  tab: string;
};

const TAB_LIST = {
  ENGLISH: "english",
  JAPANESE: "japanese",
};

export const TrendDashboardTemplate: FC<TrendDashboardTemplateProps> = async ({
  keyword,
  platformIdList,
  tab,
}) => {
  const user = await getUser();
  return (
    <div className="">
      <div className="z-10 w-full items-end justify-end px-4 md:justify-between fixed hidden md:flex bg-card">
        <h1 className="mb-4 mt-4  text-2xl font-bold">Trend</h1>
      </div>
      <div className="z-10 w-full h-16 items-end justify-end px-4 md:justify-between fixed flex md:hidden bg-card" />
      <div className="h-16 hidden md:block" />
      {/* TODO: select box */}

      <Tabs defaultValue={convertTab(tab)}>
        <TabsList className="mx-auto w-[90%] md:w-[70%] fixed mt-4 md:mt-0 z-10 ">
          <TabsTrigger className="w-1/2" value={TAB_LIST.ENGLISH}>
            Eng
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value={TAB_LIST.JAPANESE}>
            Jap
          </TabsTrigger>
        </TabsList>
        <div className="h-12 mb-2" />

        <TabsContent value={TAB_LIST.ENGLISH} className="mt-2">
          <TrendArticleTemplateContent
            languageStatus={2}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.JAPANESE}>
          <TrendArticleTemplateContent
            languageStatus={1}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const convertTab = (tab: string) => {
  if (tab !== TAB_LIST.ENGLISH && tab !== TAB_LIST.JAPANESE) {
    return "trend";
  }
  return tab;
};
