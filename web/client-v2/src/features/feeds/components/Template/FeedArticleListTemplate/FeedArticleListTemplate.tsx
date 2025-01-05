import { FC, Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";

import { getServerFeedArticleTemplateQuery } from "./actGetServerFeedArticleTemplateQuery";
import { FeedArticleHeader } from "./FeedArticleHeader";
import { FeedArticleListTemplateQuery } from "./FeedArticleListTemplateQuery";
import { FeedArticleKeywordSearchDialog } from "../../Dialog";
import { FeedArticleList } from "../../List";

type FeedArticleListTemplateProps = {
  id: string;
  keyword?: string;
};

export const FeedArticleListTemplate: FC<
  FeedArticleListTemplateProps
> = async ({ id, keyword }) => {
  const { data, error } = await getServerFeedArticleTemplateQuery(id);
  if (error) {
    return <div>Not Found</div>;
  }

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
      title: data?.feed?.name || "",
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
          <FeedArticleHeader feedId={id} keyword={keyword} />
        </div>
      </div>

      <div className="h-24" />

      <PreloadQuery
        query={FeedArticleListTemplateQuery}
        variables={{
          input: {
            first: 20,
            after: null,
            keyword,
            feedIds: [id],
          },
          favoriteArticleFoldersInput: {
            isAllFetch: true,
            isFolderOnly: true,
          },
        }}
      >
        <Suspense fallback={<SkeltonArticleList />}>
          <FeedArticleList id={id} keyword={keyword} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FeedArticleKeywordSearchDialog feedId={id} keyword={keyword} />
      </div>
    </>
  );
};
