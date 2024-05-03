import { FC } from "react";

import { fetchArticlesByFeedIdsAPI } from "@/features/articles/actions/article";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchMyFeedsByMyFeedFolderIdAPI } from "@/features/myFeeds/actions/myFeed";
import { MyFeedFolderArticleKeywordSearchInput } from "@/features/search/components/myFeedFolders/MyFeedFolderArticleKeywordSearchInput";
import { getUser } from "@/features/users/actions/user";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { MyFeedFolderArticleList } from "./MyFeedFolderArtcleList";

type MyFeedFolderDetailTemplateProps = {
  id: string;
  keyword?: string;
};

export const MyFeedFolderDetailTemplate: FC<
  MyFeedFolderDetailTemplateProps
> = async ({ id, keyword }) => {
  const user = await getUser();
  const resMyFeeds = await fetchMyFeedsByMyFeedFolderIdAPI({
    myFeedFolderId: id,
  });

  const feedIdList = resMyFeeds.data.myFeeds.map((myFeed) => myFeed.feedId);
  const res = await fetchArticlesByFeedIdsAPI({
    feedIds: feedIdList,
    keyword: keyword,
  });
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI();

  const title =
    resMyFeeds.data?.myFeeds.length > 0
      ? resMyFeeds.data?.myFeeds[0]?.myFeedFolder.title
      : "";

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "My feed folder",
      href: "/my-feed-folder",
    },
    {
      title: title,
      href: `/my-feed-folder/${id}`,
    },
  ];
  return (
    <>
      <div className="mb-2 mt-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
        <div className="mt-2">
          <MyFeedFolderArticleKeywordSearchInput myFeedFolderId={id} />
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
    </>
  );
};
