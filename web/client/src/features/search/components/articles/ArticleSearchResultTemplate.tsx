import { FC } from "react";

import { fetchArticlesAPI } from "@/features/articles/actions/article";
import { ArticleList } from "@/features/articles/components/List";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
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
  feedIdList: Array<string>;
  tab: ArticleTabType;
};

export const ArticleSearchResultTemplate: FC<
  ArticleSearchResultTemplateProps
> = async ({
  languageStatus,
  keyword,
  platformSiteType,
  feedIdList,
  tab,
}: ArticleSearchResultTemplateProps) => {
  const res = await fetchArticlesAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformSiteType: String(platformSiteType),
    feedIdList,
    tab,
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
  let feedIdPath = "";
  if (feedIdList.length) {
    feedIdPath = feedIdList.map((feedId) => `&feedId=${feedId}`).join("");
  }

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search Result",
      href: `/article/search/result/?languageStatus=${languageStatus.toString()}${keywordPath}${platformTypePath}${feedIdPath}`,
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
            languageStatus={languageStatus}
            keyword={keyword}
            platformSiteType={platformSiteType}
            feedIdList={feedIdList}
          />
        </div>
      </div>

      <div className="mt-8 md:mt-0">
        <ArticleList
          user={user}
          initialArticles={res.data.articles}
          languageStatus={languageStatus}
          keyword={keyword}
          feedIdList={feedIdList}
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
