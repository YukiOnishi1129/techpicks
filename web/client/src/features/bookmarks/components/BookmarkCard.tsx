"use client";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { BookmarkType } from "@/types/bookmark";

type BookmarkCardProps = {
  bookmark: BookmarkType;
};

export const BookmarkCard: FC<BookmarkCardProps> = ({
  bookmark,
}: BookmarkCardProps) => {
  const imageUrl = useCheckImageExist(bookmark.thumbnailURL);

  return (
    <div className="relative w-full cursor-pointer rounded hover:opacity-30">
      <div className="flex justify-around">
        <div className="w-[65%]">
          <h3 className="line-clamp-3 h-16 w-full pt-2 text-lg font-bold  tracking-wide md:text-xl">
            {bookmark.title}
          </h3>
          <div className="py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={bookmark.platform?.faviconUrl}
              alt=""
            />
            <span className="rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {bookmark.platform?.name}
            </span>
            <p className="pt-2 text-sm">
              {showDiffDateToCurrentDate(bookmark.publishedAt)}
            </p>
          </div>
        </div>

        <div className="flex h-16 w-24 justify-center  md:h-32 md:w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full rounded-lg border-2 object-cover object-center shadow-md"
            src={imageUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
