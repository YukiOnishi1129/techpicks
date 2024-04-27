import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";
import { CiSearch } from "react-icons/ci";

import { TrendArticleTemplateContent } from "@/features/trendArticles/components/TrendArticleTemplateContent";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleList } from "./ArticleList";
import { ArticleLanguageSwitch } from "./Switch";
import { fetchArticlesAPI } from "../actions/article";

type ArticleTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const ArticleTemplate: FC<ArticleTemplateProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: ArticleTemplateProps) => {
  const user = await getUser();
  return (
    <div className="w-auto">
      <div className="flex w-full items-end justify-between px-4">
        <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Today</h1>
        <div className="mb-4 mr-8 flex items-end">
          <Link className="mr-8" href="/article/search">
            <CiSearch size="36" />
          </Link>
        </div>
      </div>
      <Tabs defaultValue="trend">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/4" value="trend">
            Trend
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value="site">
            Site
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value="company">
            Company
          </TabsTrigger>
          <TabsTrigger className="w-1/4" value="summary">
            Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trend">
          <TrendArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
          />
        </TabsContent>
        <TabsContent value="site">
          <ArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"site"}
          />
        </TabsContent>
        <TabsContent value="company">
          <ArticleTemplateContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"company"}
          />
        </TabsContent>
        <TabsContent value="summary">
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

type ArticleTemplateContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
  tab: ArticleTabType;
};

const ArticleTemplateContent: FC<ArticleTemplateContentProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
  user,
  tab,
}: ArticleTemplateContentProps) => {
  const res = await fetchArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
    tab,
  });

  return (
    <>
      <div className="w-full border-b-2 bg-white py-4">
        <ArticleLanguageSwitch
          languageStatus={languageStatus}
          keyword={keyword}
          tab={tab}
        />
      </div>

      <ArticleList
        user={user}
        initialArticles={res.data.articles}
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
        tab={tab}
        fetchArticles={fetchArticlesAPI}
      />
    </>
  );
};
