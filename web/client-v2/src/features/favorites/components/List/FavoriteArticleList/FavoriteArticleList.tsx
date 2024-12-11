"use client";

import { useQuery, useSuspenseQuery } from "@apollo/client";
import { useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { FavoriteArticleListQuery } from "./FavoriteArticleListQuery";
import { FavoriteArticleCardWrapper } from "../../Card";
import { FavoriteArticleListByFolderIdTemplateQuery } from "../../Template/FavoriteArticleListByFolderIdTemplate/FavoriteArticleListByFolderIdTemplateQuery";

type FavoriteArticleListProps = {
  folderId: string;
  keyword?: string;
};

export function FavoriteArticleList({
  folderId,
  keyword,
}: FavoriteArticleListProps) {
  const observerTarget = useRef(null);

  const { data: resSuspenseData, error } = useSuspenseQuery(
    FavoriteArticleListByFolderIdTemplateQuery,
    {
      variables: {
        input: {
          first: 20,
          after: null,
          folderId,
          keyword,
        },
        favoriteArticleFoldersInput: {
          isAllFetch: true,
          isFolderOnly: false,
          isFavoriteArticleAllFetch: true,
        },
      },
    }
  );

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(FavoriteArticleListQuery, {
    variables: {
      input: {
        first: 20,
        after: null,
        folderId,
        keyword,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.favoriteArticles?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          keyword,
          folderId,
          first: 20,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          favoriteArticles: {
            ...prev.favoriteArticles,
            edges: [
              ...prev.favoriteArticles.edges,
              ...fetchMoreResult.favoriteArticles.edges,
            ],
            pageInfo: fetchMoreResult.favoriteArticles.pageInfo,
          },
        };
      },
    });
    if (resError) return;

    if (resData.favoriteArticles.pageInfo.hasNextPage) {
      const endCursor = resData.favoriteArticles.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    setIsNextPage(resData.favoriteArticles.pageInfo.hasNextPage);

    setHashMore(resData.favoriteArticles.edges.length > 0);
  }, [endCursor, isNextPage, folderId, keyword, fetchMore]);

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
      {res?.favoriteArticles.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto grid gap-4">
          {res?.favoriteArticles.edges.map((edge, i) => (
            <FavoriteArticleCardWrapper
              key={`${i}-${edge.node.id}`}
              data={edge.node}
              favoriteArticleFolders={resSuspenseData.favoriteArticleFolders}
              favoriteArticleFolderId={folderId}
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
}
