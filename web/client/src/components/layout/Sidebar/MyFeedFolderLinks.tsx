import Link from "next/link";

import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";

import { FeedAccordion } from "./Accordion";

export const MyFeedFolderLinks = async () => {
  const res = await fetchMyFeedFoldersAPI();
  return (
    <div>
      {res.data.myFeedFolders.map((myFeedFolder) => (
        <div key={myFeedFolder.id} className="max-w-[198px]">
          <div className="relative flex min-h-10 items-center space-x-2 truncate">
            <Link
              className="absolute left-10 top-0  w-4/6 pt-2 hover:bg-secondary"
              href={`/my-feed-folder/${myFeedFolder.id}`}
            >
              <span className="inline-block w-full truncate">
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
