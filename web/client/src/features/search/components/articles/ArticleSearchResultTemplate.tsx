import { FC } from "react";

import { fetchArticlesAPI } from "@/features/articles/actions/article";
import { ArticleList } from "@/features/articles/components/List";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

import { ArticleSearchDialog } from "./Dialog";

export type ArticleSearchResultTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformSiteType?: PlatformSiteType;
  platformIdList: Array<string>;
  tab: ArticleTabType;
};

export const ArticleSearchResultTemplate: FC<
  ArticleSearchResultTemplateProps
> = async ({
  languageStatus,
  keyword,
  platformSiteType,
  platformIdList,
  tab,
}: ArticleSearchResultTemplateProps) => {
  const res = await fetchArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformSiteType: String(platformSiteType),
    platformIdList,
    tab,
  });
  const platforms = await fetchPlatformAPI({
    languageStatus: languageStatus.toString(),
    platformSiteType: String(platformSiteType),
  });
  const user = await getUser();
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  let keywordPath = "";
  if (!!keyword && keyword.trim() !== "") {
    keywordPath = `&keyword=${keyword}`;
  }
  let platformTypePath = "";
  if (String(platformSiteType)) {
    platformTypePath = `&platformSiteType=${String(platformSiteType)}`;
  }
  let platformIdPath = "";
  if (platformIdList.length) {
    platformIdPath = platformIdList
      .map((platformId) => `&platformId=${platformId}`)
      .join("");
  }

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search Result",
      href: `/article/search/result/?languageStatus=${languageStatus.toString()}${keywordPath}${platformTypePath}${platformIdPath}`,
    },
  ];
  return (
    <div>
      <div className="mb-2 mt-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="my-8 hidden w-full items-center justify-between md:flex ">
        <h1 className="text-2xl font-bold ">Article Search Result</h1>
        <div className="mr-8 flex w-48 items-center justify-end">
          <ArticleSearchDialog
            platforms={platforms}
            languageStatus={languageStatus}
            keyword={keyword}
            platformSiteType={platformSiteType}
            platformIdList={platformIdList}
          />
        </div>
      </div>

      <div className="mt-8 md:mt-0">
        <ArticleList
          user={user}
          initialArticles={res.data.articles}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          favoriteArticleFolders={
            resFavoriteArticleFolders.data.favoriteArticleFolders
          }
          tab={tab}
          fetchArticles={fetchArticlesAPI}
        />
      </div>
    </div>
  );
};
