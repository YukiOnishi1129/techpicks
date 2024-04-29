import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC } from "react";
import { BiSolidSearch } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoHomeSharp } from "react-icons/io5";

import { UserAvatar } from "@/components/ui/avatar/UserAvatar";

type LoggedBottomNavigationMenuProps = {
  user: User;
};

export const LoggedBottomNavigationMenu: FC<
  LoggedBottomNavigationMenuProps
> = ({ user }: LoggedBottomNavigationMenuProps) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full grid-cols-5 bg-gray-800  text-white">
      <div className="w-1/5 border-r  px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <HiOutlineMenuAlt2 className="mt-2" size={36} />
        </Link>
      </div>

      <div className="w-1/5 border-r  px-4 py-2">
        <Link
          href="/bookmark/"
          className="flex flex-col items-center justify-center"
        >
          <FaBookmark className="mt-2" size={36} />
        </Link>
      </div>

      <div className="w-1/5 border-r  px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <IoHomeSharp className="mt-2" size={36} />
        </Link>
      </div>

      <div className="w-1/5 border-r px-4 py-2">
        <Link
          href="/article/search/"
          className="flex flex-col items-center justify-center"
        >
          <BiSolidSearch className="mt-2" size={36} />
        </Link>
      </div>

      <div className="w-1/5 border-r  px-4 py-2">
        <Link
          href="/article/search/"
          className="flex flex-col items-center justify-center"
        >
          <UserAvatar user={user} />
        </Link>
      </div>
    </div>
  );
};
