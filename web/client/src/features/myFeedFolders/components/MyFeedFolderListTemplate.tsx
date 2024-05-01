import { getUser } from "@/features/users/actions/user";

import { CreateMyFeedFolderDialog } from "./Dialog";
import { MyFeedFolderList } from "./MyFeedFolderList";
import { fetchMyFeedFoldersAPI } from "../actions/myFeedFolder";

export const MyFeedFolderListTemplate = async () => {
  const res = await fetchMyFeedFoldersAPI({});
  const user = await getUser();
  const myFeedFolders = res.data.myFeedFolders;
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold">Personal Feed Folder</h1>
      <div>
        <CreateMyFeedFolderDialog />
      </div>

      {/* Create New Feed Folder */}
      <div className="w-full border-b-2  py-4">
        <MyFeedFolderList
          initialMyFeedFolders={myFeedFolders}
          user={user}
          fetchMyFeedFoldersAPI={fetchMyFeedFoldersAPI}
        />
      </div>
    </div>
  );
};
