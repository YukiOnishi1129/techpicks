"use client";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/shared/components/layout/NotFoundList";
import { Loader } from "@/shared/components/ui/loader";

import { MyFeedFolderListQuery } from "./MyFeedFolderListQuery";
import { MyFeedFolderCard } from "../../Card";
import { MyFeedFolderListTemplateQuery } from "../../Template/MyFeedFolderListTemplate/MyFeedFolderListTemplateQuery";

type MyFeedFolderListProps = {
  keyword?: string;
  limit: number;
  feedLimit: number;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({
  keyword,
  limit,
  feedLimit,
}) => {
  const observerTarget = useRef(null);

  const { data: resSuspenseData, error } = useSuspenseQuery(
    MyFeedFolderListTemplateQuery,
    {
      variables: {
        myFeedFoldersInput: {
          keyword,
          first: limit,
          after: null,
        },
        feedsInput: {
          first: feedLimit,
          after: null,
        },
      },
    }
  );

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(MyFeedFolderListQuery, {
    variables: {
      myFeedFoldersInput: {
        keyword,
        first: limit,
        after: null,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    resSuspenseData?.myFeedFolders?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        myFeedFoldersInput: {
          keyword,
          first: limit,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          myFeedFolders: {
            ...prev.myFeedFolders,
            edges: [
              ...prev.myFeedFolders.edges,
              ...fetchMoreResult.myFeedFolders.edges,
            ],
            pageInfo: fetchMoreResult.myFeedFolders.pageInfo,
          },
        };
      },
    });

    if (resError) return;

    if (resData.myFeedFolders.pageInfo.hasNextPage) {
      const endCursor = resData.myFeedFolders.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    if (!resData.myFeedFolders.pageInfo.hasNextPage) setIsNextPage(false);

    setHashMore(resData.myFeedFolders.edges.length > 0);
  }, [endCursor, isNextPage, fetchMore, keyword, limit]);

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

  if (onlyFetchArticlesError) {
    return <div>{onlyFetchArticlesError.message}</div>;
  }

  return (
    <>
      {res?.myFeedFolders?.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <NotFoundList message="Not found my feed folders" />
        </div>
      ) : (
        <div className="m-auto mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {res?.myFeedFolders?.edges?.map((edge, i) => (
              <MyFeedFolderCard
                key={`my-feed-folder-${edge.node.id}-${i}`}
                data={edge.node}
                feedsEndCursor={
                  resSuspenseData?.feeds?.pageInfo.endCursor || undefined
                }
              />
            ))}
          </div>
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
