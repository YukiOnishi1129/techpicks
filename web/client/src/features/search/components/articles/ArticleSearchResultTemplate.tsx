import { FC } from "react";

import { fetchArticlesAPI } from "@/features/articles/actions/article";
import { ArticleList } from "@/features/articles/components/ArticleList";
import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleSearchDialog } from "./Dialog";

export type ArticleSearchResultTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  tab: ArticleTabType;
};

export const ArticleSearchResultTemplate: FC<
  ArticleSearchResultTemplateProps
> = async ({
  languageStatus,
  keyword,
  platformIdList,
  tab,
}: ArticleSearchResultTemplateProps) => {
  const res = await fetchArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
    tab,
  });
  const platforms = await fetchPlatformAPI({});
  const user = await getUser();

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search Result",
      href: "/article/search/result",
    },
  ];
  return (
    <div>
      <div className="mb-2 mt-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="my-8 flex w-full items-center justify-between ">
        <h1 className="text-2xl font-bold text-gray-800">
          Article Search Result
        </h1>
        <div className="mr-8 flex w-48 items-center justify-end">
          <ArticleSearchDialog platforms={platforms} />
        </div>
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
    </div>
  );
};
