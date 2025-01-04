"use client";

import { useQuery } from "@apollo/client";
import Link from "next/link";
import { FC } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import {
  MdFeed,
  MdRssFeed,
  MdOutlineStarOutline,
  MdBusiness,
  MdOutlineSummarize,
} from "react-icons/md";

import { CreateFavoriteArticleFolderDialog } from "@/features/favorites/components/Dialog";
import { CreateMyFeedFolderDialog } from "@/features/myFeeds/components/Dialog";

import { GetMobileSidebarQuery } from "./GetMobileSidebarQuery";
import { FavoriteArticleFolderLink } from "../FavoriteArticleFolderLink";
import { LogoutLink } from "../LogoutLink";
import { MyFeedFolderLink } from "../MyFeedFolderLink";

type SidebarProps = {
  onCloseSheet: () => void;
};

export const MobileSidebar: FC<SidebarProps> = ({ onCloseSheet }) => {
  const { data, loading, error } = useQuery(GetMobileSidebarQuery, {
    variables: {
      input: {
        isAllFetch: true,
        isFolderOnly: true,
      },
      myFeedFoldersInput: {
        isAllFetch: true,
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-lvh w-full overflow-y-auto pb-12">
      <div className="mb-16 space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="text-base">
            <Link
              href="/dashboard/trend"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <MdOutlineStarOutline />
              <span>Trend</span>
            </Link>
            <Link
              href="/dashboard/site"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <CgWebsite />
              <span>Site</span>
            </Link>
            <Link
              href="/dashboard/company"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <MdBusiness />
              <span>Company</span>
            </Link>
            <Link
              href="/dashboard/summary"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <MdOutlineSummarize />
              <span>Summary</span>
            </Link>

            <Link
              href="/bookmark"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <FaRegBookmark />
              <span>Bookmarks</span>
            </Link>

            <Link
              href="/feed"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
            >
              <MdRssFeed />
              <span>Feeds</span>
            </Link>

            {/* <Link
              href="/article/search"
              className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
              onClick={onCloseSheet}
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
              <Link
                href="/my-feed"
                className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
                onClick={onCloseSheet}
              >
                <MdFeed />
                <span className="pl-2">All</span>
              </Link>
              {data?.myFeedFolders.edges.map((edge, i) => (
                <MyFeedFolderLink
                  key={`sidebar-my-feed-link-${i}-${edge.node.id}`}
                  data={edge.node}
                />
              ))}
              <div className="ml-4">
                <CreateMyFeedFolderDialog
                  buttonVariant="ghost"
                  buttonSize={18}
                />
              </div>
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
                onClick={onCloseSheet}
              >
                <MdFeed />
                <span className="pl-2">Folders</span>
              </Link>
              <Link
                href="/favorite/article"
                className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-secondary"
                onClick={onCloseSheet}
              >
                <MdFeed />
                <span className="pl-2">All</span>
              </Link>
              {data?.favoriteArticleFolders.edges.map((edge, i) => (
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
};
