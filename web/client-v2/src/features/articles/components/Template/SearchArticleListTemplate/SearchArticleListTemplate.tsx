import { FC, Suspense } from "react";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";
import {
  BreadCrumbType,
  PageBreadcrumb,
} from "@/shared/components/ui/breadcrumb";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { ArticleTabType } from "@/shared/types/article";
import { LanguageStatus } from "@/shared/types/language";
import { PlatformSiteType } from "@/shared/types/platform";
import { SelectOptionType } from "@/shared/types/utils";

import { listServerSelectedFeedSearchArticleListTemplateQuery } from "./actListServerSelectedFeedSearchArticleListTemplateQuery";
import { SearchArticleListTemplateQuery } from "./SearchArticleListTemplateQuery";
import {
  SearchDetailArticleDialog,
  SearchDetailArticleDialogFloatButton,
} from "../../Dialog";
import { SearchArticleList } from "../../List";

const LIMIT = 20;

export type SearchArticleListTemplateProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformSiteType?: PlatformSiteType;
  feedIdList: Array<string>;
  tab: ArticleTabType;
};

export const SearchArticleListTemplate: FC<
  SearchArticleListTemplateProps
> = async ({ languageStatus, keyword, platformSiteType, feedIdList, tab }) => {
  let keywordPath = "";
  if (!!keyword && keyword.trim() !== "") {
    keywordPath = `&keyword=${keyword}`;
  }
  let platformTypePath = "";
  if (String(platformSiteType)) {
    platformTypePath = `&platformSiteType=${String(platformSiteType)}`;
  }
  let feedIdPath = "";
  if (feedIdList.length) {
    feedIdPath = feedIdList.map((feedId) => `&feedId=${feedId}`).join("");
  }

  const { data, error } =
    await listServerSelectedFeedSearchArticleListTemplateQuery(feedIdList);

  if (error) {
    return <div>{error.message}</div>;
  }

  const selectedFeedList: Array<SelectOptionType> =
    feedIdList.length > 0
      ? data.selectedFeeds.edges.map((edge) => ({
          id: edge.node.id,
          label: edge.node.name,
        }))
      : [];

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Search Result",
      href: `/search/article/?languageStatus=${languageStatus.toString()}${keywordPath}${platformTypePath}${feedIdPath}`,
    },
  ];
  return (
    <div>
      <div className="fixed z-10  w-[90%] bg-card md:block md:w-[70%] md:justify-between md:px-4">
        <div className="mb-2 mt-4">
          <PageBreadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <div className="hidden w-full items-center justify-between md:flex ">
          <h1 className="text-2xl font-bold ">Article Search Result</h1>
          <div className="mr-8 flex w-48 items-center justify-end">
            <SearchDetailArticleDialog
              keyword={keyword}
              selectedFeedList={selectedFeedList}
              feedsEndCursor={data?.initFeeds?.pageInfo?.endCursor || undefined}
            />
          </div>
        </div>
      </div>

      <div className="h-12 md:h-24" />

      <div className="mt-8 md:mt-0">
        <PreloadQuery
          query={SearchArticleListTemplateQuery}
          variables={{
            input: {
              first: LIMIT,
              after: null,
              languageStatus,
              keyword,
              feedIds: feedIdList,
              tab,
            },
            favoriteArticleFoldersInput: {
              isAllFetch: true,
              isFolderOnly: true,
            },
          }}
        >
          <Suspense fallback={<ScreenLoader />}>
            <SearchArticleList
              limit={LIMIT}
              languageStatus={languageStatus}
              tab={tab}
              feedIdList={feedIdList}
              keyword={keyword}
            />
          </Suspense>
        </PreloadQuery>
      </div>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchDetailArticleDialogFloatButton
          keyword={keyword}
          selectedFeedList={selectedFeedList}
          feedsEndCursor={data?.initFeeds?.pageInfo?.endCursor || undefined}
        />
      </div>
    </div>
  );
};
