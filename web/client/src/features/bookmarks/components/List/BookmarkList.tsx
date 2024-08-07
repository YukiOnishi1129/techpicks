"use client";

import { User } from "@supabase/supabase-js";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { BookmarkType } from "@/types/bookmark";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { LanguageStatus } from "@/types/language";

import { FetchBookmarkListAPIResponse } from "../../actions/bookmark";
import { BookmarkCardWrapper } from "../Card";

type Props = {
  user: User | undefined;
  initialBookmarks: Array<BookmarkType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
  fetchBookmarks: ({
    languageStatus,
    keyword,
    offset,
    platformIdList,
  }: {
    languageStatus?: string;
    keyword?: string;
    offset: string;
    platformIdList: Array<string>;
  }) => Promise<FetchBookmarkListAPIResponse>;
};

export const BookmarkList: FC<Props> = ({
  user,
  initialBookmarks,
  favoriteArticleFolders,
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
      const res = await fetchBookmarks({
        offset: offset.toString(),
        keyword: keyword,
        languageStatus: languageStatus?.toString(),
        platformIdList: platformIdList,
      });
      setBookmarks((prev) => [...prev, ...res.data.bookmarks]);

      const count = res.data.bookmarks.length;
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
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  useEffect(() => {
    if (offset > 1) {
      loadMore(offset);
    }
  }, [loadMore, offset, hashMore]);

  return (
    <div className="m-auto">
      {flatBookmarks.length === 0 ? (
        <NotFoundList message="No bookmarks found" />
      ) : (
        <>
          {flatBookmarks.map((bookmark) => (
            <div key={bookmark.id} className="mb-8">
              <BookmarkCardWrapper
                bookmark={bookmark}
                favoriteArticleFolders={favoriteArticleFolders}
                user={user}
              />
            </div>
          ))}
          <div ref={observerTarget}>
            {hashMore && (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
