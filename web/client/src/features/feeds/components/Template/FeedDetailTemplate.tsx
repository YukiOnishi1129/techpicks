import { FC } from "react";

import { fetchArticlesByFeedIdsAPI } from "@/features/articles/actions/article";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";
import { MyFeedFolderArticleList } from "@/features/myFeedFolders/components/List";
import { FeedArticleKeywordSearchDialog } from "@/features/search/components/feeds/Dialog";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { FeedDetailHeader } from "./FeedDetailHeader";
import { fetchFeedByIdAPI } from "../../actions/feed";

type FeedDetailPageProps = {
  id: string;
  keyword?: string;
};

export const FeedDetailTemplate: FC<FeedDetailPageProps> = async ({
  id,
  keyword,
}: FeedDetailPageProps) => {
  const user = await getUser();
  const feedIdList = [id];
  const res = await fetchArticlesByFeedIdsAPI({
    feedIds: feedIdList,
    keyword: keyword,
  });
  const resFeed = await fetchFeedByIdAPI(id);
  const resMyFeedList = await fetchMyFeedFoldersAPI({});
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  const title = resFeed.data.feed?.name;

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Feeds",
      href: "/feed",
    },
    {
      title: title || "",
      href: `/feed/${id}`,
    },
  ];

  return (
    <>
      <div className="fixed z-10 w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <div className="mt-2">
          {resFeed.data.feed && (
            <FeedDetailHeader
              user={user}
              keyword={keyword}
              feed={resFeed.data.feed}
              myFeedFolders={resMyFeedList.data.myFeedFolders}
            />
          )}
        </div>
      </div>

      <div className="h-24" />

      <MyFeedFolderArticleList
        user={user}
        initialArticles={res.data.articles}
        keyword={keyword}
        feedIdList={feedIdList}
        favoriteArticleFolders={
          resFavoriteArticleFolders.data.favoriteArticleFolders
        }
        fetchArticles={fetchArticlesByFeedIdsAPI}
      />

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FeedArticleKeywordSearchDialog feedId={id} keyword={keyword} />
      </div>
    </>
  );
};
