import Link from "next/link";
import { FC } from "react";
import { CiSearch } from "react-icons/ci";

import { ArticleTemplateContent } from "@/features/articles/components/ArticleTemplateContent";
import { TrendArticleTemplateContent } from "@/features/trendArticles/components/TrendArticleTemplateContent";
import { getUser } from "@/features/users/actions/user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageStatus } from "@/types/language";

type HomeTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const HomeTemplate: FC<HomeTemplateProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: HomeTemplateProps) => {
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
