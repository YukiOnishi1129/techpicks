"use client";

import { User } from "@supabase/supabase-js";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Loader } from "@/components/ui/loader";

import { BookmarkType } from "@/types/bookmark";
import { LanguageStatus } from "@/types/language";

import { BookmarkCard } from "./BookmarkCard";
import { BookmarkLanguageTabMenu } from "./BookmarkLanguageTabMenu";

type Props = {
  user: User | undefined;
  initialBookmarks: Array<BookmarkType>;
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  fetchBookmarks: ({
    languageStatus,
    keyword,
    offset,
    platformIdList,
  }: {
    languageStatus: string;
    keyword?: string;
    offset: string;
    platformIdList: Array<string>;
  }) => Promise<BookmarkType[]>;
};

export const BookmarkList: FC<Props> = ({
  initialBookmarks,
  keyword,
  languageStatus,
  platformIdList,
  fetchBookmarks,
}: Props) => {
  const observerTarget = useRef(null);

  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(initialBookmarks);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);

  const flatBookmarks = bookmarks
    ? bookmarks.flatMap((bookmark) => bookmark)
    : [];

  const loadMore = useCallback(
    async (offset: number) => {
      const newBookmarks = await fetchBookmarks({
        offset: offset.toString(),
        keyword: keyword,
        languageStatus: languageStatus.toString(),
        platformIdList: platformIdList,
      });
      setBookmarks((prev) => [...prev, ...newBookmarks]);

      const count = newBookmarks.length;
      setHashMore(count > 0);
    },
    [fetchBookmarks, languageStatus, keyword, platformIdList]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hashMore) {
            setOffset((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    let observerRefValue: null = null;

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [hashMore]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Read Later</h1>
      <div className="w-full border-b-2 bg-white py-4">
        <BookmarkLanguageTabMenu
          languageStatus={languageStatus}
          keyword={keyword}
        />
      </div>
      <div className="m-auto h-[700px] overflow-y-scroll md:h-[600px]">
        {flatBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="border-t-2 py-8">
            <BookmarkCard bookmark={bookmark} />
          </div>
        ))}
        <div ref={observerTarget}>
          {hashMore && (
            <div className="flex justify-center py-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
