import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { fetchArticlesByFeedIdsAPI } from "@/features/articles/actions/article";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchMyFeedsByMyFeedFolderIdAPI } from "@/features/myFeeds/actions/myFeed";
import { MyFeedFolderArticleKeyWordSearchDialog } from "@/features/search/components/myFeedFolders/Dialog/MyFeedFolderArticleKeywordSearchDialog";
import { MyFeedFolderArticleKeywordSearchInput } from "@/features/search/components/myFeedFolders/MyFeedFolderArticleKeywordSearchInput";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { MyFeedFolderArticleList } from "../List";

type MyFeedFolderDetailTemplateProps = {
  user: User;
  id: string;
  keyword?: string;
};

export const MyFeedFolderDetailTemplate: FC<
  MyFeedFolderDetailTemplateProps
> = async ({ user, id, keyword }) => {
  const resMyFeeds = await fetchMyFeedsByMyFeedFolderIdAPI({
    myFeedFolderId: id,
  });

  const feedIdList = resMyFeeds.data.myFeeds.map((myFeed) => myFeed.feedId);

  const res = await fetchArticlesByFeedIdsAPI({
    feedIds: feedIdList,
    keyword: keyword,
  });
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

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
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4 pb-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden md:block">
          <MyFeedFolderArticleKeywordSearchInput
            myFeedFolderId={id}
            keyword={keyword}
          />
        </div>
      </div>

      <div className="h-12 md:h-24" />

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
        <MyFeedFolderArticleKeyWordSearchDialog
          myFeedFolderId={id}
          keyword={keyword}
        />
      </div>
    </>
  );
};
