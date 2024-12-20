"use client";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useState } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { MyFeedFolderListQuery } from "./MyFeedFolderListQuery";
import { MyFeedFolderListTemplateQuery } from "../../Template/MyFeedFolderListTemplate/MyFeedFolderListTemplateQuery";

type MyFeedFolderListProps = {
  keyword?: string;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({ keyword }) => {
  const limit = 10;
  const { data: resSuspenseData, error } = useSuspenseQuery(
    MyFeedFolderListTemplateQuery,
    {
      variables: {
        myFeedFoldersInput: {
          keyword,
          first: limit,
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
    res?.myFeedFolders?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;

    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
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
    setIsNextPage(resData.myFeedFolders.pageInfo.hasNextPage);

    setHashMore(resData.myFeedFolders.edges.length > 0);
  }, [endCursor, isNextPage, fetchMore, keyword]);

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
        <div>
          <NotFoundList message="Not found my feed folders" />
        </div>
      ) : (
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {res?.myFeedFolders?.edges.map((edge, i) => (
              <div key={`${i}-${edge.node.id}`}>{edge.node.id}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
