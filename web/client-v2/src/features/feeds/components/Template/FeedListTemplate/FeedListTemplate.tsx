import { FC, Suspense } from "react";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { PlatformSiteType } from "@/shared/types/platform";
import { SearchParamsType } from "@/shared/types/utils";

import { FeedListTemplateQuery } from "./FeedListTemplateQuery";
import { FeedKeywordSearchDialog } from "../../Dialog";
import { FeedList } from "../../List";
import { FeedKeywordSearchForm } from "../../Search";

type FeedListTemplateProps = {
  searchParams: SearchParamsType;
  platformSiteType?: PlatformSiteType;
  platformId?: string;
  keyword?: string;
};

export const FeedListTemplate: FC<FeedListTemplateProps> = ({
  searchParams,
  platformSiteType,
  platformId,
  keyword,
}) => {
  return (
    <>
      <div className="fixed z-50 hidden w-[90%] gap-2 bg-card py-4 md:block md:w-[70%] md:p-4">
        <h1 className="text-2xl font-bold">Feed List</h1>
        <div>
          <FeedKeywordSearchForm keyword={keyword} />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <PreloadQuery
        query={FeedListTemplateQuery}
        variables={{
          input: {
            first: 10,
            after: null,
            keyword,
            platformSiteType: Number(platformSiteType),
            platformId,
          },
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ScreenLoader />}
        >
          <FeedList
            keyword={keyword}
            platformSiteType={platformSiteType}
            platformId={platformId}
          />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FeedKeywordSearchDialog keyword={keyword} />
      </div>
    </>
  );
};
