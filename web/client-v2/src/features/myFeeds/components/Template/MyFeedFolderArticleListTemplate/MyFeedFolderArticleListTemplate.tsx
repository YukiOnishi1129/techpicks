import { FC } from "react";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import {
  FavoriteArticleFoldersInput,
  FeedsInput,
  MyFeedFolderInput,
} from "@/graphql/type";

import { getMyFeedFolderArticleListTemplateQuery } from "./actGetMyFeedFolderArticleListTemplateQuery";

type MyFeedFolderArticleListTemplateProps = {
  myFeedFolderId: string;
  keyword?: string;
};

export const MyFeedFolderArticleListTemplate: FC<
  MyFeedFolderArticleListTemplateProps
> = async ({ myFeedFolderId, keyword }) => {
  const myFeedFolderInput: MyFeedFolderInput = {
    id: myFeedFolderId,
  };
  const feedsInput: FeedsInput = {
    isAllFetch: true,
  };
  const favoriteArticleFoldersInput: FavoriteArticleFoldersInput = {
    isAllFetch: true,
    isFolderOnly: true,
  };
  const { data, error } = await getMyFeedFolderArticleListTemplateQuery(
    myFeedFolderInput,
    feedsInput,
    favoriteArticleFoldersInput
  );

  const title = data?.myFeedFolder.title;
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "My feed folders",
      href: "/my-feed",
    },
    {
      title: title,
      href: `/my-feed/${myFeedFolderId}`,
    },
  ];

  return (
    <>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4 pb-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden md:block">
          {/* <MyFeedFolderArticleKeywordSearchInput
            myFeedFolderId={id}
            keyword={keyword}
          /> */}
        </div>
      </div>

      <div className="h-12 md:h-24" />

      {/* <MyFeedFolderArticleList
        user={user}
        initialArticles={res.data.articles}
        keyword={keyword}
        feedIdList={feedIdList}
        favoriteArticleFolders={
          resFavoriteArticleFolders.data.favoriteArticleFolders
        }
        fetchArticles={fetchArticlesByFeedIdsAPI}
      /> */}

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        {/* <MyFeedFolderArticleKeyWordSearchDialog
          myFeedFolderId={id}
          keyword={keyword}
        /> */}
      </div>
    </>
  );
};
