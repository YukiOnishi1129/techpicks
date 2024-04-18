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
  const faviconUrl = useCheckImageExist(bookmark.platformFaviconUrl);

  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="flex justify-center md:w-[30%]">
          <div className="w-full  md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full rounded-lg border-2 object-cover object-center shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3  pt-2 text-left text-lg font-bold tracking-wide md:text-xl">
            {bookmark.title}
          </h3>

          <p className="flex pt-2 text-sm">
            {`登録: ${showDiffDateToCurrentDate(bookmark.createdAt)}`}
          </p>

          <div className="flex w-full items-center pt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={faviconUrl}
              alt=""
            />
            <p className="inline-block rounded-lg  bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {bookmark.platformName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
