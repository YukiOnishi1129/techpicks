"use client";

import Link from "next/link";
import { FC } from "react";
import { BiSolidSearch } from "react-icons/bi";
import { FaFolder, FaBookmark } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { MdArticle } from "react-icons/md";

export const BottomNavigationMenu: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-24 w-full grid-cols-5 bg-gray-800 text-white">
      <div className="w-1/5 border-r border-gray-600 px-4 py-2">
        <Link href="/" className="flex flex-col items-center justify-center">
          <IoHomeSharp className="mt-2" size={40} />
          <span className="fixed bottom-2 inline-block">home</span>
        </Link>
      </div>
      <div className="w-1/5 border-r border-gray-600 px-4 py-2">
        <Link
          href="/article/search/"
          className="flex flex-col items-center justify-center"
        >
          <BiSolidSearch className="mt-2" size={40} />
          <span className="fixed bottom-2 inline-block">search</span>
        </Link>
      </div>
      <div className="w-1/5 border-r border-gray-600 px-4 py-2">
        <Link
          href="/bookmark/"
          className="flex flex-col items-center justify-center"
        >
          <FaBookmark className="mt-2" size={40} />
          <span className="fixed bottom-2 inline-block">book</span>
        </Link>
      </div>
      <div className="w-1/5 border-r border-gray-600 px-4 py-2">
        <Link
          href="/myfeed-list/"
          className="flex flex-col items-center justify-center"
        >
          <FaFolder className="mt-2" size={40} />
          <span className="fixed bottom-2 inline-block">feed</span>
        </Link>
      </div>
      <div className="w-1/5  px-4 py-2">
        <Link
          href="/my-article-folder/"
          className="flex flex-col items-center justify-center"
        >
          <MdArticle className="mt-2" size={40} />
          <span className="fixed bottom-2 inline-block">article</span>
        </Link>
      </div>
    </div>
  );
};
