import { FC } from "react";

import { TrendArticleTemplateContent } from "@/features/trendArticles/components/TrendArticleTemplateContent";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="fixed z-10 hidden w-full items-end justify-end bg-card px-4 md:flex md:justify-between">
        <h1 className="my-4 text-2xl  font-bold">Trend</h1>
      </div>
      <div className="fixed z-10 flex h-16 w-full items-end justify-end bg-card px-4 md:hidden md:justify-between" />
      <div className="hidden h-16 md:block" />
      {/* TODO: select box */}

      <Tabs defaultValue={convertTab(tab)}>
        <TabsList className="fixed z-10 mx-auto mt-4 w-[90%] md:mt-0 md:w-[70%] ">
          <TabsTrigger className="w-1/2" value={TAB_LIST.ENGLISH}>
            Eng
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value={TAB_LIST.JAPANESE}>
            Jap
          </TabsTrigger>
        </TabsList>
        <div className="mb-2 h-12" />

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
