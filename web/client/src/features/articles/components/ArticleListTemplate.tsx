import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";
import { CiSearch } from "react-icons/ci";

import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleLanguageSwitch } from "./ArticleLanguageSwitch";
import { ArticleList } from "./ArticleList";
import { fetchArticleAPI } from "../actions/article";

type ArticleListTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const ArticleListTemplate: FC<ArticleListTemplateProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: ArticleListTemplateProps) => {
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
          <ArticleListContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"trend"}
          />
        </TabsContent>
        <TabsContent value="site">
          <ArticleListContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"site"}
          />
        </TabsContent>
        <TabsContent value="company">
          <ArticleListContent
            languageStatus={languageStatus}
            keyword={keyword}
            platformIdList={platformIdList}
            user={user}
            tab={"company"}
          />
        </TabsContent>
        <TabsContent value="summary">
          <ArticleListContent
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

type ArticleListContentProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  user: User | undefined;
  tab: ArticleTabType;
};

const ArticleListContent = async ({
  languageStatus,
  keyword,
  platformIdList,
  user,
  tab,
}: ArticleListContentProps) => {
  const articles = await fetchArticleAPI({
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

      {languageStatus === 1 && (
        <ArticleList
          user={user}
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          tab={tab}
          fetchArticles={fetchArticleAPI}
        />
      )}
      {languageStatus === 2 && (
        <ArticleList
          user={user}
          initialArticles={articles}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          tab={tab}
          fetchArticles={fetchArticleAPI}
        />
      )}
    </>
  );
};
