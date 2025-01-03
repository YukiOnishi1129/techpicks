"use client";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FragmentOf, readFragment } from "gql.tada";
import { useCallback, useRef, useState, useEffect } from "react";

import { ArticleCardWrapper } from "@/features/articles/components/Card";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { MyFeedFolderArticleListFragment } from "./MyFeedFolderArticleListFragment";
import { MyFeedFolderArticleListQuery } from "./MyFeedFolderArticleListQuery";

type MyFeedFolderArticleListProps = {
  data: FragmentOf<typeof MyFeedFolderArticleListFragment>;
  keyword?: string;
};

export function MyFeedFolderArticleList({
  data,
  keyword,
}: MyFeedFolderArticleListProps) {
  const observerTarget = useRef(null);

  const fragment = readFragment(MyFeedFolderArticleListFragment, data);

  const { error } = useSuspenseQuery(MyFeedFolderArticleListQuery, {
    variables: {
      input: {
        first: 20,
        after: null,
        keyword,
      },
    },
  });

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(MyFeedFolderArticleListQuery, {
    variables: {
      input: {
        first: 20,
        after: null,
        keyword: keyword,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.articles.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: 20,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          articles: {
            ...prev.articles,
            edges: [...prev.articles.edges, ...fetchMoreResult.articles.edges],
            pageInfo: fetchMoreResult.articles.pageInfo,
          },
        };
      },
    });

    if (resError) return;

    if (resData.articles.pageInfo.hasNextPage) {
      const endCursor = resData.articles.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    setIsNextPage(resData.articles.pageInfo.hasNextPage);

    setHashMore(resData.articles.edges.length > 0);
  }, [fetchMore, endCursor, isNextPage]);

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
      {res?.articles?.edges.length === 0 ? (
        <div>
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div>
          {res?.articles?.edges?.map((edge, i) => (
            <ArticleCardWrapper
              key={`${i}-${edge.node.id}`}
              data={edge.node}
              tab="unknown"
              favoriteArticleFolders={fragment.favoriteArticleFolders}
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
