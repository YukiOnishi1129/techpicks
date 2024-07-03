import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { BiSolidSearch } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { MdFeed, MdCalendarToday, MdRssFeed } from "react-icons/md";

import { CreateFavoriteArticleFolderDialog } from "@/features/favoriteArticleFolders/components/Dialog";
import { CreateMyFeedFolderDialog } from "@/features/myFeedFolders/components/Dialog";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { FavoriteArticleFolderLinks } from "./FavoriteArticleFolderLinks";
import { LogoutLink } from "./LogoutLink";
import { MyFeedFolderLinks } from "./MyFeedFolderLinks";

type DesktopSidebarProps = {
  user?: User;
  myFeedFolders: Array<MyFeedFolderType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
};

export function DesktopSidebar({
  user,
  myFeedFolders,
  favoriteArticleFolders,
}: DesktopSidebarProps) {
  return (
    <div className="h-lvh w-full overflow-y-auto border-r-2 pb-12">
      <div className="mb-16 space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="text-base">
            <Link
              href="/dashboard/trend"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdCalendarToday />
              <span>Trend</span>
            </Link>
            <Link
              href="/dashboard/site"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdCalendarToday />
              <span>Site</span>
            </Link>
            <Link
              href="/dashboard/company"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdCalendarToday />
              <span>Company</span>
            </Link>
            <Link
              href="/dashboard/summary"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdCalendarToday />
              <span>Summary</span>
            </Link>
            {user && (
              <Link
                href="/bookmark"
                className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              >
                <FaRegBookmark />
                <span>Bookmarks</span>
              </Link>
            )}
            <Link
              href="/feed"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdRssFeed />
              <span>Feeds</span>
            </Link>
            <Link
              href="/article/search"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <BiSolidSearch />
              <span>Search</span>
            </Link>
          </div>
        </div>

        {user && (
          <>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                My Feeds
              </h2>
              <div className="mt-2 text-base">
                <Link
                  href="/my-feed-folder"
                  className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
                >
                  <MdFeed />
                  <span className="pl-2">All</span>
                </Link>
                <MyFeedFolderLinks myFeedFolders={myFeedFolders} />
                <div className="ml-4">
                  <CreateMyFeedFolderDialog buttonVariant="ghost" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Favorite Articles
              </h2>
              <div className="mt-2">
                <Link
                  href="/favorite-article-folder"
                  className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
                >
                  <MdFeed />
                  <span className="pl-2">All</span>
                </Link>
                <FavoriteArticleFolderLinks
                  favoriteArticleFolders={favoriteArticleFolders}
                />
                <div className="ml-4">
                  <CreateFavoriteArticleFolderDialog buttonVariant="ghost" />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="ml-4 mt-8 px-4 py-2 md:hidden">
          <LogoutLink />
        </div>
      </div>
    </div>
  );
}
