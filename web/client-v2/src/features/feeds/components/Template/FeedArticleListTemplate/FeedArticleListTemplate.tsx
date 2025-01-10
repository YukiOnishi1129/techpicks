import { FC, Suspense } from "react";

import { SkeltonArticleList } from "@/features/articles/components/List";

import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { getServerFeedArticleTemplateQuery } from "./actGetServerFeedArticleTemplateQuery";
import { FeedArticleHeader } from "./FeedArticleHeader";
import { FeedArticleListTemplateQuery } from "./FeedArticleListTemplateQuery";
import { FeedArticleKeywordSearchDialog } from "../../Dialog";
import { FeedArticleList } from "../../List";

type FeedArticleListTemplateProps = {
  id: string;
  keywordList: Array<string>;
  searchParams: SearchParamsType;
};

export const FeedArticleListTemplate: FC<
  FeedArticleListTemplateProps
> = async ({ id, keywordList, searchParams }) => {
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
          <FeedArticleHeader feedId={id} keywordList={keywordList} />
        </div>
      </div>

      <div className="h-24" />

      <PreloadQuery
        query={FeedArticleListTemplateQuery}
        variables={{
          input: {
            first: 20,
            after: null,
            keywords: keywordList,
            feedIds: [id],
          },
          favoriteArticleFoldersInput: {
            isAllFetch: true,
            isFolderOnly: true,
          },
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeltonArticleList />}
        >
          <FeedArticleList id={id} keywordList={keywordList} />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FeedArticleKeywordSearchDialog feedId={id} keywordList={keywordList} />
      </div>
    </>
  );
};
