import Link from "next/link";
import { FC } from "react";
import { BiSolidSearch } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchMyFeedFoldersAPI } from "@/features/myFeedFolders/actions/myFeedFolder";

import { MobileSidebarNavigation } from "./MobileSidebarNavigation/";

type LoggedBottomNavigationMenuProps = {};

export const LoggedBottomNavigationMenu: FC<
  LoggedBottomNavigationMenuProps
> = async () => {
  const myFeedFolderRes = await fetchMyFeedFoldersAPI();
  const favoriteArticleFolderRes = await fetchFavoriteArticleFoldersAPI({});

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-12 w-full grid-cols-5 bg-gray-800  text-white">
      <div className="flex w-1/4  flex-col items-center justify-center border-r px-4 py-2">
        <MobileSidebarNavigation
          myFeedFolders={myFeedFolderRes.data.myFeedFolders}
          favoriteArticleFolders={
            favoriteArticleFolderRes.data.favoriteArticleFolders
          }
        />
      </div>

      <div className="w-1/4 border-r  px-4 py-2">
        <Link
          href="/bookmark"
          className="flex flex-col items-center justify-center"
        >
          <FaBookmark className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/4 border-r  px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <IoHomeSharp className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/4 border-r px-4 py-2">
        <Link
          href="/article/search"
          className="flex flex-col items-center justify-center"
        >
          <BiSolidSearch className="mt-2" size={24} />
        </Link>
      </div>

      {/* <div className="w-1/5 border-r  px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <UserAvatar user={user} />
        </div>
      </div> */}
    </div>
  );
};
