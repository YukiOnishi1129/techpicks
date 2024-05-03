import { FC } from "react";

import { fetchArticlesByFeedIdsAPI } from "@/features/articles/actions/article";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { MyFeedFolderArticleList } from "@/features/myFeedFolders/components/MyFeedFolderArtcleList";
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
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI();

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
        <FeedDetailHeader
          title={title || ""}
          description={resFeed.data.feed?.description}
          imageUrl={resFeed.data.feed?.thumbnailUrl}
        />
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
