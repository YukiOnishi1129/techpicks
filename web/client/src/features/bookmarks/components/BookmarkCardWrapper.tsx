"use client";
import { FC } from "react";

import { BookmarkType } from "@/types/bookmark";

import { BookmarkCard } from "./BookmarkCard";
import { BookmarkDetailSheet } from "./BookmarkDetailSheet";
import { DeleteBookmarkAlertDialog } from "./Dialog";

type BookmarkCardWrapperProps = {
  bookmark: BookmarkType;
};

export const BookmarkCardWrapper: FC<BookmarkCardWrapperProps> = ({
  bookmark,
}: BookmarkCardWrapperProps) => {
  return (
    <div
      key={bookmark.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div className="border-t-4 border-t-rose-600">
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={bookmark.platformFaviconUrl}
                alt=""
              />
              <span className="font-bold">{bookmark.platformName}</span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <DeleteBookmarkAlertDialog
              bookmarkId={bookmark.id}
              bookmarkTitle={bookmark.title}
            />
          </div>
        </div>

        <BookmarkDetailSheet bookmark={bookmark}>
          <BookmarkCard bookmark={bookmark} />
        </BookmarkDetailSheet>
      </div>
    </div>
  );
};
