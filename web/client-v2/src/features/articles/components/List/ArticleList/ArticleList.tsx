"use client";

import { useSuspenseQuery, useQuery } from "@apollo/client";
import { useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/shared/components/layout/NotFoundList";
import { Loader } from "@/shared/components/ui/loader";
import { ArticleTabType } from "@/shared/types/article";
import { LanguageStatus } from "@/shared/types/language";

import { ArticleListQuery } from "./ArticleListQuery";
import { ArticleCardWrapper } from "../../Card/ArticleCardWrapper/ArticleCardWrapper";
import { ArticleDashboardTemplateQuery } from "../../Template/ArticleDashboardTemplate/ArticleDashboardTemplateQuery";

type ArticleListProps = {
  languageStatus: LanguageStatus;
  tab: ArticleTabType;
};

export function ArticleList({ languageStatus, tab }: ArticleListProps) {
  const observerTarget = useRef(null);

  const { data: resSuspenseData, error } = useSuspenseQuery(
    ArticleDashboardTemplateQuery,
    {
      variables: {
        input: {
          first: 20,
          after: null,
          languageStatus,
          tab,
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
    error: onlyFetchArticlesError,
  } = useQuery(ArticleListQuery, {
    variables: {
      input: {
        first: 20,
        after: null,
        languageStatus,
        tab,
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
          languageStatus,
          tab,
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
  }, [languageStatus, tab, endCursor, isNextPage, fetchMore]);

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
        <div className="flex flex-col items-center justify-center">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto grid gap-4">
          {res?.articles?.edges?.map((edge, i) => (
            <ArticleCardWrapper
              key={`${i}-${edge.node.id}`}
              data={edge.node}
              favoriteArticleFolders={resSuspenseData.favoriteArticleFolders}
              tab={tab}
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
