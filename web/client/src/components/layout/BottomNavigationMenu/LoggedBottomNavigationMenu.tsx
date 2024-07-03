import Link from "next/link";
import { FC } from "react";
import { BiSolidSearch } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { SiFeedly } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";

type LoggedBottomNavigationMenuProps = {};

export const LoggedBottomNavigationMenu: FC<
  LoggedBottomNavigationMenuProps
> = async () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-12 w-full grid-cols-4 bg-card text-white">
      <div className="w-1/4 border-r  px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <IoHomeSharp className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/4 border-r  px-4 py-2">
        <Link
          href="/bookmark"
          className="flex flex-col items-center justify-center"
        >
          <FaBookmark className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/4 border-r px-4 py-2">
        <Link
          href="/my-feed-folder"
          className="flex flex-col items-center justify-center"
        >
          <SiFeedly className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/4 border-r px-4 py-2">
        <Link
          href="/favorite-article-folder"
          className="flex flex-col items-center justify-center"
        >
          <FaRegHeart className="mt-2" size={24} />
        </Link>
      </div>
    </div>
  );
};
