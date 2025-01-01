import { FC, Suspense } from "react";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { PreloadQuery } from "@/lib/apollo/client";

// import { MyFeedFoldersInput } from "@/graphql/type";

import { MyFeedFolderListTemplateQuery } from "./MyFeedFolderListTemplateQuery";
import { CreateMyFeedFolderDialog } from "../../Dialog";
import { MyFeedFolderList } from "../../List";

const LIMIT = 6;

type MyFeedFolderListTemplateProps = {
  keyword?: string;
};

export const MyFeedFolderListTemplate: FC<MyFeedFolderListTemplateProps> = ({
  keyword,
}) => {
  return (
    <div className="w-auto">
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">My Feed Folders</h1>
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="w-4/5 pr-4">
            {/* <MyFeedFolderKeywordSearchInput keyword={keyword} /> */}
          </div>
          <CreateMyFeedFolderDialog />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <PreloadQuery
        query={MyFeedFolderListTemplateQuery}
        variables={{
          myFeedFoldersInput: {
            keyword,
            first: LIMIT,
            after: null,
          },
        }}
      >
        <Suspense fallback={<ScreenLoader />}>
          <MyFeedFolderList keyword={keyword} limit={LIMIT} />
        </Suspense>
      </PreloadQuery>

      {/* <MyFeedFolderList
            initialMyFeedFolders={myFeedFolders}
            user={user}
            initialFeedList={resInitialFeedList.data.feeds}
          /> */}

      {/* <div className="fixed bottom-20 right-4 z-50 md:hidden">
            <MyFeedFolderKeywordSearchDialog keyword={keyword} />
          </div> */}
    </div>
  );
};
