import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";

import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";

import { FeedAccordion } from "./Accordion";

type MyFeedFolderLinksProps = {
  user: User;
};
export const MyFeedFolderLinks: FC<MyFeedFolderLinksProps> = async ({
  user,
}: MyFeedFolderLinksProps) => {
  const res = await fetchMyFeedFoldersAPI();
  return (
    <div>
      {res.data.myFeedFolders.map((myFeedFolder) => (
        <div key={myFeedFolder.id} className="max-w-[198px]">
          <div className="relative flex items-center space-x-2 truncate">
            <Link
              className="absolute left-10 top-1 h-6 w-4/6  "
              href={`/my-feed-folder/${myFeedFolder.id}`}
            >
              <span className="inline-block w-full truncate hover:bg-secondary">
                {myFeedFolder.title}
              </span>
            </Link>

            <div>
              <FeedAccordion myFeedFolder={myFeedFolder} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
