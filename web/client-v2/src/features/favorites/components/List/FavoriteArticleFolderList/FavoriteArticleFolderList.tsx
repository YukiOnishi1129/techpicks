"use client";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { useManageFavoriteFolder } from "@/features/favorites/hooks/useManageFavoriteFolder";

import { NotFoundList } from "@/shared/components/layout/NotFoundList";
import { Loader } from "@/shared/components/ui/loader";

import { FavoriteArticleFolderListQuery } from "./FavoriteArticleFolderListQuery";
import { FavoriteArticleFolderCard } from "../../Card";
import { FavoriteArticleFolderListTemplateQuery } from "../../Template/FavoriteArticleFolderListTemplate/FavoriteArticleFolderListTemplateQuery";

type FavoriteArticleFolderListProps = {
  keywordList: Array<string>;
};

export const FavoriteArticleFolderList: FC<FavoriteArticleFolderListProps> = ({
  keywordList,
}) => {
  const observerTarget = useRef(null);

  const { error } = useSuspenseQuery(FavoriteArticleFolderListTemplateQuery, {
    variables: {
      input: {
        first: 9,
        after: null,
        keywords: keywordList,
      },
    },
  });

  const {
    data: res,
    fetchMore,
    error: onlyFetchArticlesError,
  } = useQuery(FavoriteArticleFolderListQuery, {
    variables: {
      input: {
        first: 9,
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
    res?.favoriteArticleFolders?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const {
    handleUpdateFavoriteArticleFolder,
    handleDeleteFavoriteArticleFolder,
  } = useManageFavoriteFolder();

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: 9,
          after: endCursor,
          keywords: keywordList,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          favoriteArticleFolders: {
            ...prev.favoriteArticleFolders,
            edges: [
              ...prev.favoriteArticleFolders.edges,
              ...fetchMoreResult.favoriteArticleFolders.edges,
            ],
            pageInfo: fetchMoreResult.favoriteArticleFolders.pageInfo,
          },
        };
      },
    });
    if (resError) return;

    if (resData.favoriteArticleFolders.pageInfo?.endCursor) {
      const endCursor =
        resData.favoriteArticleFolders.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }
    if (!resData.favoriteArticleFolders.pageInfo.hasNextPage)
      setIsNextPage(false);

    setHashMore(resData.favoriteArticleFolders.edges.length > 0);
  }, [endCursor, keywordList, isNextPage, fetchMore]);

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
    return <div>Error: {error.message}</div>;
  }

  if (onlyFetchArticlesError) {
    return <div>{onlyFetchArticlesError.message}</div>;
  }

  return (
    <>
      {res?.favoriteArticleFolders?.edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <NotFoundList message="No folder found" />
        </div>
      ) : (
        <div className="m-auto mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {res?.favoriteArticleFolders?.edges?.map((edge, i) => (
              <FavoriteArticleFolderCard
                key={`favorite-folder-${edge.node.id}-${i}`}
                data={edge.node}
                onUpdateFavoriteArticleFolder={
                  handleUpdateFavoriteArticleFolder
                }
                onDeleteFavoriteArticleFolder={
                  handleDeleteFavoriteArticleFolder
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
