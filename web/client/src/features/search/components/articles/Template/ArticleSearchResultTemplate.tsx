import { FC } from "react";

import { fetchArticlesAPI } from "@/features/articles/actions/article";
import { ArticleList } from "@/features/articles/components/List";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchAllFeedAPI, fetchFeedsAPI } from "@/features/feeds/actions/feed";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

import { ArticleSearchDialog, ArticleSearchDialogFloatButton } from "../Dialog";

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
  const resSelectedFeedList = await fetchAllFeedAPI({ feedIdList });
  const resInitialFeedList = await fetchFeedsAPI({});

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
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mb-2 mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <div className="hidden w-full items-center justify-between md:flex ">
          <h1 className="text-2xl font-bold ">Article Search Result</h1>
          <div className="mr-8 flex w-48 items-center justify-end">
            <ArticleSearchDialog
              keyword={keyword}
              selectedFeedList={resSelectedFeedList.data.feeds}
              initialFeedList={resInitialFeedList.data.feeds}
            />
          </div>
        </div>
      </div>

      <div className="h-12 md:h-24" />

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

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <ArticleSearchDialogFloatButton
          keyword={keyword}
          selectedFeedList={resSelectedFeedList.data.feeds}
          initialFeedList={resInitialFeedList.data.feeds}
        />
      </div>
    </div>
  );
};
