import { FC, Suspense } from "react";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { PreloadQuery } from "@/lib/apollo/client";

import { PlatformSiteType } from "@/types/platform";

import { FeedListTemplateQuery } from "./FeedListTemplateQuery";
import { FeedList } from "../../List/FeedList/FeedList";

type FeedListTemplateProps = {
  platformSiteType?: PlatformSiteType;
  platformId?: string;
  keyword?: string;
};

export const FeedListTemplate: FC<FeedListTemplateProps> = ({
  platformSiteType,
  platformId,
  keyword,
}) => {
  return (
    <>
      <div className="fixed z-50 hidden w-[90%] gap-2 bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">Feed List</h1>
        <div>{/* <FeedKeywordSearchInput keyword={keyword} /> */}</div>
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
        <Suspense fallback={<ScreenLoader />}>
          <FeedList
            keyword={keyword}
            platformSiteType={platformSiteType}
            platformId={platformId}
          />
        </Suspense>
      </PreloadQuery>

      {/* <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <FeedKeywordSearchDialog keyword={keyword} />
      </div> */}
    </>
  );
};
