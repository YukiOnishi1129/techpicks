import { FC } from "react";

import { fetchArticlesByFeedIdsAPI } from "@/features/articles/actions/article";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";
import { MyFeedFolderArticleList } from "@/features/myFeedFolders/components/List";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { FeedDetailHeader } from "./FeedDetailHeader";
import { fetchFeedByIdAPI } from "../actions/feed";

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
  const resMyFeedList = await fetchMyFeedFoldersAPI();
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
    <div className="mb-2 mt-4">
      <PageBreadcrumb breadcrumbs={breadcrumbs} />
      <div className="my-2">
        {resFeed.data.feed && (
          <FeedDetailHeader
            user={user}
            feed={resFeed.data.feed}
            myFeedFolders={resMyFeedList.data.myFeedFolders}
          />
        )}
      </div>
      <div className="mt-4">
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
      </div>
    </div>
  );
};
