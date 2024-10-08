"use client";

import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Loader } from "@/components/ui/loader";

import { getBookmarkListQuery } from "./actGetBookmarkListQuery";
import { BookmarkListFragment } from "./BookmarkListFragment";
import { BookmarkCardWrapper } from "../../Card";

type BookmarkListProps = {
  data: FragmentOf<typeof BookmarkListFragment>;
  user: User;
  keyword?: string;
  after?: string | null;
};

export const BookmarkList: FC<BookmarkListProps> = ({
  user,
  data,
  keyword,
  after,
}) => {
  const observerTarget = useRef(null);
  const fragment = readFragment(BookmarkListFragment, data);
  const [edges, setEdges] = useState(fragment.edges);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);
  const [isNextPage, setIsNextPage] = useState(true);

  const flatBookmarks = edges ? edges.flatMap((edge) => edge.node) : [];

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: res, error } = await getBookmarkListQuery({
      userId: user.id,
      first: 20,
      after: endCursor,
      keyword,
    });
    if (error) return;
    const newBookmarks = readFragment(BookmarkListFragment, res.bookmarks);
    if (newBookmarks.pageInfo.hasNextPage) {
      setEndCursor(newBookmarks.pageInfo.endCursor);
    }
    if (!newBookmarks.pageInfo.hasNextPage) setIsNextPage(false);

    if (newBookmarks.edges.length > 0) {
      setEdges((prev) => [...prev, ...newBookmarks.edges]);
      setHashMore(newBookmarks.edges.length > 0);
    }
  }, [keyword, user.id, endCursor, isNextPage]);

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
    setEdges(fragment.edges);
  }, [fragment.edges]);

  useEffect(() => {
    if (offset > 1) {
      loadMore();
    }
  }, [offset, hashMore]); // eslint-disable-line

  return (
    <>
      {flatBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          {/* <NotFoundList message="No articles found" /> */}
          Not Found
        </div>
      ) : (
        <div className="m-auto">
          {flatBookmarks.map((bookmark) => (
            <div key={bookmark.id} className="mb-4">
              <BookmarkCardWrapper data={bookmark} user={user} />
            </div>
          ))}
          <div ref={observerTarget}>
            {hashMore && isNextPage && (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
