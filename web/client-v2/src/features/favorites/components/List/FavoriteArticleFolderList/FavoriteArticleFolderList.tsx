"use client";
import { useMutation, useQuery, useSuspenseQuery } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { deleteFavoriteArticleFolderMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleFolderMutation";
import { UpdateFavoriteArticleFolderMutation } from "@/features/favorites/mutations/UpdateFavoriteArticleFolderMutation";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { useStatusToast } from "@/hooks/useStatusToast";

import { serverRevalidatePage } from "@/actions/actServerRevalidatePage";

import { FavoriteArticleFolderListQuery } from "./FavoriteArticleFolderListQuery";
import { FavoriteArticleFolderCard } from "../../Card";
import { FavoriteArticleFolderListTemplateQuery } from "../../Template/FavoriteArticleFolderListTemplate/FavoriteArticleFolderListTemplateQuery";

type FavoriteArticleFolderListProps = {
  user?: User;
  keyword?: string;
};

export const FavoriteArticleFolderList: FC<FavoriteArticleFolderListProps> = ({
  user,
  keyword,
}) => {
  const observerTarget = useRef(null);
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();

  const { error } = useSuspenseQuery(FavoriteArticleFolderListTemplateQuery, {
    variables: {
      input: {
        first: 9,
        after: null,
        keyword: keyword,
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
        keyword: keyword,
      },
    },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "network-only",
  });

  const [updateFavoriteArticleFolderMutation] = useMutation(
    UpdateFavoriteArticleFolderMutation
  );

  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(
    res?.favoriteArticleFolders?.pageInfo?.endCursor || null
  );
  const [isNextPage, setIsNextPage] = useState(true);

  const handleUpdateFavoriteArticleFolder = useCallback(
    async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description?: string;
    }) => {
      if (!user) {
        failToast({
          description: "Please login to edit a favorite folder",
        });
        await logoutToLoginPage();
        return;
      }
      const { data: updateData, errors } =
        await updateFavoriteArticleFolderMutation({
          variables: {
            input: {
              id,
              title,
              description,
            },
          },
          update: (cache, data) => {
            if (data.data?.updateFavoriteArticleFolder) {
              cache.modify({
                id: cache.identify(data.data.updateFavoriteArticleFolder),
                fields: {
                  title() {
                    return title;
                  },
                  description() {
                    return description;
                  },
                },
              });
            }
          },
        });

      let errMsg = "";
      if (errors) {
        errMsg = "Fail: Something went wrong";
        if (errors.length > 0) {
          errMsg = errors[0].message;
        }
      }

      if (errMsg !== "") {
        failToast({
          description: errMsg,
        });
        return;
      }

      successToast({
        description: `Updated favorite article folder: "${title}"`,
      });
    },
    [user, successToast, failToast, updateFavoriteArticleFolderMutation]
  );

  const handleDeleteFavoriteArticleFolder = useCallback(
    async (id: string) => {
      // 1. login check
      if (!user) {
        failToast({
          description: "Please login to delete a favorite folder",
        });
        await logoutToLoginPage();
        return;
      }

      const { data: deleteData, error } =
        await deleteFavoriteArticleFolderMutation({ id });

      let errMsg = "";
      if (error) {
        errMsg = "Fail: Something went wrong";
        if (error.length > 0) {
          errMsg = error[0].message;
        }
      }

      if (!deleteData?.deleteFavoriteArticleFolder)
        errMsg = "Fail: Something went wrong";

      if (errMsg !== "") {
        failToast({
          description: errMsg,
        });
        return;
      }

      successToast({
        description: "Successfully deleted favorite article folder",
      });

      await serverRevalidatePage(pathname);
    },
    [user, successToast, failToast, pathname]
  );

  const loadMore = useCallback(async () => {
    if (!isNextPage) return;
    const { data: resData, error: resError } = await fetchMore({
      variables: {
        input: {
          first: 9,
          after: endCursor,
          keyword: keyword,
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
  }, [endCursor, keyword, isNextPage, fetchMore]);

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
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No folder found" />
        </div>
      ) : (
        <div className="m-auto mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {res?.favoriteArticleFolders?.edges?.map((edge, i) => (
              <FavoriteArticleFolderCard
                key={`favorite-folder-${edge.node.id}-${i}`}
                data={edge.node}
                handleUpdateFavoriteArticleFolder={
                  handleUpdateFavoriteArticleFolder
                }
                handleDeleteFavoriteArticleFolder={
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
