"use client";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { NotFoundList } from "@/shared/components/layout/NotFoundList";
import { Loader } from "@/shared/components/ui/loader";

import { AllFolderFavoriteArticleListQuery } from "./AllFolderFavoriteArticleListQuery";
import { AllFolderFavoriteArticleCardWrapper } from "../../Card";
import { AllFolderFavoriteArticleListTemplateQuery } from "../../Template/AllFolderFavoriteArticleListTemplate/AllFolderFavoriteArticleListTemplateQuery";

type AllFolderFavoriteArticleListFragmentProps = {
  keywordList: Array<string>;
  limit: number;
};

export const AllFolderFavoriteArticleList: FC<
  AllFolderFavoriteArticleListFragmentProps
> = ({ keywordList, limit }) => {
  const observerTarget = useRef(null);

  const { data: resSuspenseData, error } = useSuspenseQuery(
    AllFolderFavoriteArticleListTemplateQuery,
    {
      variables: {
        favoriteAllFolderArticlesInput: {
          first: limit,
          after: null,
          keywords: keywordList,
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
  } = useQuery(AllFolderFavoriteArticleListQuery, {
    variables: {
      input: {
        first: limit,
        after: null,
        keywords: keywordList,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.favoriteAllFolderArticles?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: limit,
          after: endCursor,
          keywords: keywordList,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          favoriteAllFolderArticles: {
            ...prev.favoriteAllFolderArticles,
            edges: [
              ...prev.favoriteAllFolderArticles.edges,
              ...fetchMoreResult.favoriteAllFolderArticles.edges,
            ],
            pageInfo: fetchMoreResult.favoriteAllFolderArticles.pageInfo,
          },
        };
      },
    });
    if (resError) return;

    if (resData.favoriteAllFolderArticles.pageInfo.hasNextPage) {
      const endCursor =
        resData.favoriteAllFolderArticles.pageInfo.endCursor || null;
      setEndCursor(endCursor);
    }
    if (!resData.favoriteAllFolderArticles.pageInfo.hasNextPage)
      setIsNextPage(false);

    setHashMore(resData.favoriteAllFolderArticles.edges.length > 0);
  }, [endCursor, isNextPage, keywordList, fetchMore, limit]);

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
    return <div>Error</div>;
  }

  if (onlyFetchArticlesError) {
    return <div>Error</div>;
  }

  return (
    <>
      {res?.favoriteAllFolderArticles.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto grid gap-4">
          {res?.favoriteAllFolderArticles.edges.map((edge, i) => (
            <AllFolderFavoriteArticleCardWrapper
              key={`${i}-${edge.node.id}`}
              data={edge}
              favoriteArticleFolders={resSuspenseData.favoriteArticleFolders}
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
