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
      <h1 className="mb-4 mt-8 text-2xl font-bold">My Feed Folders</h1>
      <div>
        <CreateMyFeedFolderDialog />
      </div>

      {/* Create New Feed Folder */}
      <div className="w-full border-b-2  py-4">
        <MyFeedFolderList initialMyFeedFolders={myFeedFolders} user={user} />
      </div>
    </div>
  );
};
