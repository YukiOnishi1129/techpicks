"use client";
import Link from "next/link";
import { BiSolidSearch } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { IoHomeSharp } from "react-icons/io5";

export const NotLoggedBottomNavigationMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-12 w-full grid-cols-3 bg-card  text-white">
      <div className="w-1/3 border-r  px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <IoHomeSharp className="mt-2" size={24} />
        </Link>
      </div>

      <div className="w-1/3 border-r px-4 py-2">
        <Link
          href="/article/search"
          className="flex flex-col items-center justify-center"
        >
          <BiSolidSearch className="mt-2" size={24} />
        </Link>
      </div>
      <div className="w-1/3 border-r px-4 py-2">
        <Link
          href="/login"
          className="flex flex-col items-center justify-center"
        >
          <CiLogin className="mt-2" size={24} />
        </Link>
      </div>
    </div>
  );
};
