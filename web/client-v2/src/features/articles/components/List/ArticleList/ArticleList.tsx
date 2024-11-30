"use client";

import { useApolloClient, useQuery } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { useCallback, useRef, useState, useEffect } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { ArticleTabType } from "@/types/article";
import { LanguageStatus } from "@/types/language";

import { ArticleListFragment } from "./ArticleListFragment";
import { GetArticleListQuery } from "./GetArticleListQuery";
import { FavoriteFolderArticleCardWrapperFragment } from "../../Card";
import { ArticleCardWrapper } from "../../Card/ArticleCardWrapper/ArticleCardWrapper";

type ArticleListProps = {
  user: User;
  data: FragmentOf<typeof ArticleListFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderArticleCardWrapperFragment
  >;
  languageStatus: LanguageStatus;
  tab: ArticleTabType;
};

export function ArticleList({
  user,
  data,
  favoriteArticleFolders,
  languageStatus,
  tab,
}: ArticleListProps) {
  const client = useApolloClient();
  const observerTarget = useRef(null);

  const fragment = readFragment(ArticleListFragment, data);

  client.cache.writeQuery({
    query: GetArticleListQuery,
    data: {
      articles: data,
    },
  });

  const {
    data: res,
    fetchMore,
    error,
  } = useQuery(GetArticleListQuery, {
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
    notifyOnNetworkStatusChange: true,
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);
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

  return (
    <>
      {res?.articles?.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto grid gap-4">
          {res?.articles?.edges?.map((edge) => (
            <ArticleCardWrapper
              key={edge.node.id}
              data={edge.node}
              favoriteArticleFolders={favoriteArticleFolders}
              user={user}
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
