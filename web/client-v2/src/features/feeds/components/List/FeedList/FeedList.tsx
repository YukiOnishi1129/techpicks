"use client";

import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/shared/components/layout/NotFoundList";
import { Loader } from "@/shared/components/ui/loader";
import { PlatformSiteType } from "@/shared/types/platform";

import { FeedListQuery } from "./FeedListQuery";
import { FeedCardWrapper } from "../../Card";
import { FeedListTemplateQuery } from "../../Template/FeedListTemplate/FeedListTemplateQuery";

type FeedListProps = {
  platformSiteType?: PlatformSiteType;
  platformId?: string;
  keywordList: Array<string>;
};

export const FeedList: FC<FeedListProps> = ({
  platformSiteType,
  platformId,
  keywordList,
}) => {
  const observerTarget = useRef(null);

  const { error } = useSuspenseQuery(FeedListTemplateQuery, {
    variables: {
      input: {
        first: 10,
        after: null,
        keywords: keywordList,
        platformSiteType: Number(platformSiteType),
        platformId,
      },
    },
  });

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(FeedListQuery, {
    variables: {
      input: {
        first: 10,
        after: null,
        keywords: keywordList,
        platformSiteType: Number(platformSiteType),
        platformId,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.feeds.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;

    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: 10,
          after: endCursor,
          keywords: keywordList,
          platformSiteType: Number(platformSiteType),
          platformId,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          feeds: {
            ...prev.feeds,
            edges: [...prev.feeds.edges, ...fetchMoreResult.feeds.edges],
            pageInfo: fetchMoreResult.feeds.pageInfo,
          },
        };
      },
    });

    if (resError) return;

    if (resData.feeds.pageInfo.hasNextPage) {
      const endCursor = resData.feeds.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    setIsNextPage(resData.feeds.pageInfo.hasNextPage);

    setHashMore(resData.feeds.edges.length > 0);
  }, [
    endCursor,
    fetchMore,
    isNextPage,
    keywordList,
    platformId,
    platformSiteType,
  ]);

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
      {res?.feeds?.edges.length === 0 ? (
        <NotFoundList message="No articles found" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
          {res?.feeds?.edges?.map((edge, i) => (
            <FeedCardWrapper key={`${i}-${edge.node.id}`} data={edge.node} />
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
