import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { CreateMyFeedFolderDialog } from "./Dialog";
import { MyFeedFolderList } from "./MyFeedFolderList";
import { fetchMyFeedFoldersAPI } from "../actions/myFeedFolder";

type MyFeedFolderListTemplateProps = {
  user: User;
};

export const MyFeedFolderListTemplate: FC<
  MyFeedFolderListTemplateProps
> = async ({ user }) => {
  const res = await fetchMyFeedFoldersAPI();
  const myFeedFolders = res.data.myFeedFolders;
  return (
    <div className="w-auto">
      <div className="fixed z-10 hidden w-[90%] bg-card md:block md:w-[70%] md:px-4">
        <h1 className="mt-4 text-2xl font-bold">My Feed Folders</h1>
        <div className="mt-2">
          <CreateMyFeedFolderDialog />
        </div>
      </div>

      <div className="h-4 md:h-[120px]" />

      <MyFeedFolderList initialMyFeedFolders={myFeedFolders} user={user} />
    </div>
  );
};
