"use client";
import { FC } from "react";
// import { uuid } from "uuidv4";

import { BookmarkType } from "@/types/bookmark";

import { BookmarkCard } from "./BookmarkCard";
import { BookmarkDetailSheet } from "./BookmarkDetailSheet";

type BookmarkCardWrapperProps = {
  bookmark: BookmarkType;
};

export const BookmarkCardWrapper: FC<BookmarkCardWrapperProps> = ({
  bookmark,
}: BookmarkCardWrapperProps) => {
  return (
    <div key={bookmark.id} className="rounded-2xl border-2 md:py-2">
      <BookmarkDetailSheet bookmark={bookmark}>
        <BookmarkCard bookmark={bookmark} />
      </BookmarkDetailSheet>
      <div className="flex size-8 items-center justify-center rounded-full bg-white px-8 py-4"></div>
    </div>
  );
};
