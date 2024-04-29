import { FC } from "react";

import { ArticleTemplateContent } from "@/features/articles/components/ArticleTemplateContent";
import { ArticleLanguageSwitch } from "@/features/articles/components/Switch";
import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { ArticleSearchDialog } from "@/features/search/components/articles/Dialog";
import { TrendArticleTemplateContent } from "@/features/trendArticles/components/TrendArticleTemplateContent";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageStatus } from "@/types/language";

type HomeTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  tab: string;
};

const TAB_LIST = {
  TREND: "trend",
  SITE: "site",
  COMPANY: "company",
  SUMMARY: "summary",
};

export const HomeTemplate: FC<HomeTemplateProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
  tab,
}: HomeTemplateProps) => {
  const user = await getUser();
  const platforms = await fetchPlatformAPI({
    languageStatus: "0",
  });
  return (
    <div className="w-auto">
      <div className="flex w-full items-end justify-between px-4">
        <h1 className="mb-4 mt-8 text-2xl font-bold ">Today</h1>
        <div className="mb-4 flex w-48 items-center justify-end">
          <div className="mr-4 hidden cursor-pointer md:block">
            <ArticleSearchDialog platforms={platforms} />
          </div>

          <div className="min-w-24">
            <ArticleLanguageSwitch
              languageStatus={languageStatus}
              keyword={keyword}
              tab={tab}
            />
          </div>
        </div>
      </div>
      <Tabs defaultValue={convertTab(tab)}>
        <TabsList className="mb-2 w-full">
          <TabsTrigger className="w-1/4" value={TAB_LIST.TREND}>
            Trend
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value={TAB_LIST.SITE}>
            Site
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value={TAB_LIST.COMPANY}>
            Company
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value={TAB_LIST.SUMMARY}>
            Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TAB_LIST.TREND}>
          <TrendArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.SITE}>
          <ArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"site"}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.COMPANY}>
          <ArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"company"}
          />
        </TabsContent>
        <TabsContent value={TAB_LIST.SUMMARY}>
          <ArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"summary"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const convertTab = (tab: string) => {
  if (
    tab !== TAB_LIST.TREND &&
    tab !== TAB_LIST.SITE &&
    tab !== TAB_LIST.COMPANY &&
    tab !== TAB_LIST.SUMMARY
  ) {
    return "trend";
  }
  return tab;
};
