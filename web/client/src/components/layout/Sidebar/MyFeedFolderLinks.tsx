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
          {myFeedFolder.feeds.map((feed) => (
            <div
              key={`${myFeedFolder.id}-${feed.id}`}
              className="truncate pl-2"
            >
              <Link
                href={`/feed/${feed.id}`}
                className="flex items-center space-x-2 truncate"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="size-4" src={feed.platform.faviconUrl} alt="" />

                <span className="inline-block w-full truncate">
                  {feed.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
