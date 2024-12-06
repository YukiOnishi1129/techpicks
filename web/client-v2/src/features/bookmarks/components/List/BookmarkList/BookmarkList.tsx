"use client";

import { useQuery, useSuspenseQuery } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { BookmarkListQuery } from "./BookmarkListQuery";
import { BookmarkCardWrapper } from "../../Card";
import { BookmarkTemplateQuery } from "../../Template/BookmarkTemplate/BookmarkTemplateQuery";

type BookmarkListProps = {
  user: User;
  keyword?: string;
  after?: string | null;
};

export const BookmarkList: FC<BookmarkListProps> = ({
  user,
  keyword,
  after,
}) => {
  const observerTarget = useRef(null);

  const { data: resSuspenseData, error } = useSuspenseQuery(
    BookmarkTemplateQuery,
    {
      variables: {
        input: {
          first: 20,
          after: null,
          userId: user.id,
          keyword,
        },
        favoriteArticleFoldersInput: {
          isAllFetch: true,
          isFolderOnly: true,
        },
      },
    }
  );

  const {
    data: res,
    fetchMore,
    error: onlyFetchBookmarksError,
  } = useQuery(BookmarkListQuery, {
    variables: {
      input: {
        first: 20,
        after: null,
        userId: user.id,
        keyword,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.bookmarks?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;

    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: 20,
          userId: user.id,
          keyword,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          bookmarks: {
            ...prev.bookmarks,
            edges: [
              ...prev.bookmarks.edges,
              ...fetchMoreResult.bookmarks.edges,
            ],
            pageInfo: fetchMoreResult.bookmarks.pageInfo,
          },
        };
      },
    });
    if (resError) return;

    if (resData.bookmarks.pageInfo.hasNextPage) {
      const endCursor = resData.bookmarks.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    if (!resData.bookmarks.pageInfo.hasNextPage) setIsNextPage(false);

    setHashMore(resData.bookmarks.edges.length > 0);
  }, [keyword, user.id, endCursor, isNextPage, fetchMore]);

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
      loadMore();
    }
  }, [offset, hashMore]); // eslint-disable-line

  if (error) {
    return <div>{error.message}</div>;
  }
  if (onlyFetchBookmarksError) {
    return <div>{onlyFetchBookmarksError.message}</div>;
  }

  return (
    <>
      {res?.bookmarks.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <NotFoundList message="No bookmarks found" />
        </div>
      ) : (
        <div className="m-auto grid gap-4">
          {res?.bookmarks.edges?.map((edge, i) => (
            <BookmarkCardWrapper
              key={`${i}-${edge.node.id}`}
              data={edge.node}
              favoriteArticleFolders={resSuspenseData.favoriteArticleFolders}
              user={user}
            />
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
