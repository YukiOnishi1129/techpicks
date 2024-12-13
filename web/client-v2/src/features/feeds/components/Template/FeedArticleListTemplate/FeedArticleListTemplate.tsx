import { FC, Suspense } from "react";

import { ScreenLoader } from "@/components/layout/ScreenLoader";
import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { PreloadQuery } from "@/lib/apollo/client";

import { FeedArticleListTemplateQuery } from "./FeedArticleListTemplateQuery";
import { FeedArticleList } from "../../List";

type FeedArticleListTemplateProps = {
  id: string;
  keyword?: string;
};

export const FeedArticleListTemplate: FC<FeedArticleListTemplateProps> = ({
  id,
  keyword,
}) => {
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
      title: "",
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
          {/* {resFeed.data.feed && (
            <FeedDetailHeader
              user={user}
              keyword={keyword}
              feed={resFeed.data.feed}
              myFeedFolders={resMyFeedList.data.myFeedFolders}
            />
          )} */}
        </div>
      </div>

      <div className="h-24" />

      <PreloadQuery
        query={FeedArticleListTemplateQuery}
        variables={{
          input: {
            first: 20,
            after: null,
            feedIds: [id],
          },
          favoriteArticleFoldersInput: {
            isAllFetch: true,
            isFolderOnly: true,
          },
        }}
      >
        <Suspense fallback={<ScreenLoader />}>
          <FeedArticleList id={id} keyword={keyword} />
        </Suspense>
      </PreloadQuery>
    </>
  );
};
