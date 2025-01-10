import { FC, Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import {
  FavoriteArticleFoldersInput,
  FeedsInput,
  MyFeedFolderInput,
} from "@/graphql/type";
import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { getMyFeedFolderArticleListTemplateQuery } from "./actGetMyFeedFolderArticleListTemplateQuery";
import { MyFeedFolderArticleListTemplateQuery } from "./MyFeedFolderArticleListTemplateQuery";
import { SearchMyFeedFolderArticleDialog } from "../../Dialog";
import { MyFeedFolderArticleList } from "../../List";
import { MyFeedFolderArticleKeywordSearchForm } from "../../Search";

const LIMIT = 20;

type MyFeedFolderArticleListTemplateProps = {
  myFeedFolderId: string;
  keywordList: Array<string>;
  searchParams: SearchParamsType;
};

export const MyFeedFolderArticleListTemplate: FC<
  MyFeedFolderArticleListTemplateProps
> = async ({ myFeedFolderId, keywordList, searchParams }) => {
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

  if (error) {
    return <div>{error.message}</div>;
  }

  const feedIdList = data?.myFeedFolder?.feeds
    ? data?.myFeedFolder?.feeds.map((feed) => feed.id)
    : [];

  return (
    <>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mt-4 pb-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="hidden md:block">
          <MyFeedFolderArticleKeywordSearchForm
            myFeedFolderId={myFeedFolderId}
            keywordList={keywordList}
          />
        </div>
      </div>

      <div className="h-12 md:h-32" />
      <PreloadQuery
        query={MyFeedFolderArticleListTemplateQuery}
        variables={{
          input: {
            first: LIMIT,
            after: null,
            keywords: keywordList,
            feedIds: feedIdList,
          },
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeltonArticleList />}
        >
          <MyFeedFolderArticleList
            data={data}
            limit={LIMIT}
            feedIdList={feedIdList}
            keywordList={keywordList}
          />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchMyFeedFolderArticleDialog
          myFeedFolderId={myFeedFolderId}
          keywordList={keywordList}
        />
      </div>
    </>
  );
};
