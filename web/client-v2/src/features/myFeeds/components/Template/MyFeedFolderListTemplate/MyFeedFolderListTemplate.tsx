import { FC, Suspense } from "react";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";
import { SELECTABLE_FEED_LIST_LIMIT } from "@/shared/constant/limit";
import { PreloadQuery } from "@/shared/lib/apollo/client";
import { SearchParamsType } from "@/shared/types/utils";

import { MyFeedFolderListTemplateQuery } from "./MyFeedFolderListTemplateQuery";
import {
  CreateMyFeedFolderDialog,
  SearchMyFeedFolderDialog,
} from "../../Dialog";
import { MyFeedFolderList } from "../../List";
import { MyFeedFolderKeywordSearchForm } from "../../Search";

const LIMIT = 6;

type MyFeedFolderListTemplateProps = {
  keywordList: Array<string>;
  searchParams: SearchParamsType;
};

export const MyFeedFolderListTemplate: FC<MyFeedFolderListTemplateProps> = ({
  keywordList,
  searchParams,
}) => {
  return (
    <div className="w-auto">
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">My Feed Folders</h1>
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="w-4/5 pr-4">
            <MyFeedFolderKeywordSearchForm keywordList={keywordList} />
          </div>
          <CreateMyFeedFolderDialog />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <PreloadQuery
        query={MyFeedFolderListTemplateQuery}
        variables={{
          myFeedFoldersInput: {
            keywords: keywordList,
            first: LIMIT,
            after: null,
          },
          feedsInput: {
            first: SELECTABLE_FEED_LIST_LIMIT,
            after: null,
          },
        }}
      >
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ScreenLoader />}
        >
          <MyFeedFolderList
            keywordList={keywordList}
            limit={LIMIT}
            feedLimit={SELECTABLE_FEED_LIST_LIMIT}
          />
        </Suspense>
      </PreloadQuery>

      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <SearchMyFeedFolderDialog keywordList={keywordList} />
      </div>
    </div>
  );
};
