import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { MyFeedFolderKeywordSearchInput } from "@/features/search/components/myFeedFolders/MyFeedFolderKeywordSearchInput";

import { fetchMyFeedFoldersAPI } from "../../actions/myFeedFolder";
import { CreateMyFeedFolderDialog } from "../Dialog";
import { MyFeedFolderList } from "../List/MyFeedFolderList";

type MyFeedFolderListTemplateProps = {
  user: User;
  keyword?: string;
};

export const MyFeedFolderListTemplate: FC<
  MyFeedFolderListTemplateProps
> = async ({ user, keyword }) => {
  const res = await fetchMyFeedFoldersAPI({ keyword });
  const myFeedFolders = res.data.myFeedFolders;
  return (
    <div className="w-auto">
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">My Feed Folders</h1>
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="w-4/5 pr-4">
            <MyFeedFolderKeywordSearchInput keyword={keyword} />
          </div>
          <CreateMyFeedFolderDialog />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <MyFeedFolderList initialMyFeedFolders={myFeedFolders} user={user} />
    </div>
  );
};
