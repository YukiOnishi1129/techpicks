import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import {
  MdBusiness,
  MdFeed,
  MdOutlineStarOutline,
  MdOutlineSummarize,
} from "react-icons/md";

// import { CreateFavoriteArticleFolderDialog } from "@/features/favoriteArticleFolders/components/Dialog";
// import { CreateMyFeedFolderDialog } from "@/features/myFeedFolders/components/Dialog";

// import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
// import { MyFeedFolderType } from "@/types/myFeedFolder";

// import { FavoriteArticleFolderLinks } from "./FavoriteArticleFolderLinks";
import { CreateFavoriteArticleFolderDialog } from "@/features/favorites/components/Dialog";

import { DeskTopSidebarFragment } from "./DesktopSidebarFragment";
import { FavoriteArticleFolderLink } from "../FavoriteArticleFolderLink";
import { LogoutLink } from "../LogoutLink";
// import { MyFeedFolderLinks } from "./MyFeedFolderLinks";

type DesktopSidebarProps = {
  user: User;
  data: FragmentOf<typeof DeskTopSidebarFragment>;
};

export function DesktopSidebar({ user, data }: DesktopSidebarProps) {
  const fragment = readFragment(DeskTopSidebarFragment, data);

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
              <MdOutlineStarOutline />
              <span>Trend</span>
            </Link>
            <Link
              href="/dashboard/site"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <CgWebsite />
              <span>Site</span>
            </Link>
            <Link
              href="/dashboard/company"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdBusiness />
              <span>Company</span>
            </Link>
            <Link
              href="/dashboard/summary"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <MdOutlineSummarize />
              <span>Summary</span>
            </Link>

            <Link
              href="/bookmark"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
            >
              <FaRegBookmark />
              <span>Bookmarks</span>
            </Link>
            {/* <Link
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
            </Link> */}
          </div>
        </div>

        <>
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              My Feeds
            </h2>
            <div className="mt-2 text-base">
              {/* <Link
                  href="/my-feed-folder"
                  className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
                >
                  <MdFeed />
                  <span className="pl-2">All</span>
                </Link> */}
              {/* <MyFeedFolderLinks myFeedFolders={myFeedFolders} /> */}
              {/* <div className="ml-4">
                  <CreateMyFeedFolderDialog
                    buttonVariant="ghost"
                    buttonSize={18}
                  />
                </div> */}
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Favorite Articles
            </h2>
            <div className="mt-2">
              <Link
                href="/favorite"
                className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              >
                <MdFeed />
                <span className="pl-2">All</span>
              </Link>
              {fragment.favoriteArticleFolders.edges.map((edge, i) => (
                <FavoriteArticleFolderLink
                  key={`sidebar-favorite-link-${i}`}
                  data={edge.node}
                />
              ))}
              <div className="ml-4">
                <CreateFavoriteArticleFolderDialog
                  buttonVariant="ghost"
                  buttonSize={18}
                />
              </div>
            </div>
          </div>
        </>

        <div className="ml-4 mt-8 px-4 py-2 md:hidden">
          <LogoutLink />
        </div>
      </div>
    </div>
  );
}
