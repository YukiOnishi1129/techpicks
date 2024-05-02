import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";

import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";

type MyFeedFolderLinksProps = {
  user: User;
};
export const MyFeedFolderLinks: FC<MyFeedFolderLinksProps> = async ({
  user,
}: MyFeedFolderLinksProps) => {
  const res = await fetchMyFeedFoldersAPI();
  return (
    <div className="space-y-1">
      {res.data.myFeedFolders.map((myFeedFolder) => (
        <div key={myFeedFolder.id} className="max-w-[198px]">
          <Link href={`/my-feed-folder/${myFeedFolder.id}`}>
            <span className="inline-block w-full truncate">
              {myFeedFolder.title}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};
