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
    <div className="relative w-full cursor-pointer rounded">
      <div className="flex justify-around">
        <div className="flex h-16 w-24 justify-center  md:h-32 md:w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full rounded-lg border-2 object-cover object-center shadow-md"
            src={imageUrl}
            alt=""
          />
        </div>

        <div className="w-[65%]">
          <h3 className="mb-8 line-clamp-3 w-4/5  pt-2 text-left text-lg font-bold tracking-wide md:text-xl">
            {bookmark.title}
          </h3>

          <div className="flex w-full items-center pt-2 md:w-4/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={bookmark.platformFaviconUrl}
              alt=""
            />
            <p className="inline-block rounded-lg  bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {bookmark.platformName}
            </p>
          </div>
          {bookmark.publishedAt && (
            <p className="flex pt-2 text-sm">
              {showDiffDateToCurrentDate(bookmark.publishedAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
