import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { MdFeed } from "react-icons/md";

import { MyFeedFolderLinks } from "./MyFeedFolderLinks";

type SidebarProps = {
  user: User | undefined;
};
export function Sidebar({ user }: SidebarProps) {
  return (
    <div className="h-lvh w-full overflow-y-auto border-r-2 pb-12">
      <div className="mb-8 space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-1 pl-8">
            <div>
              <Link href="/">Today</Link>
            </div>
            <div>
              <Link href="/bookmark">Bookmarks</Link>
            </div>
            <div>
              <Link href="/feed">Feeds</Link>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            My Feeds
          </h2>
          <div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-md px-2 hover:bg-secondary">
              <MdFeed />
              <Link href="/my-feed-folder" className="pl-2">
                All
              </Link>
            </div>
            {user && <MyFeedFolderLinks user={user} />}
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            My Articles
          </h2>
          <div className="space-y-1 pl-8">
            <div>
              <Link href="/favorite">All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
