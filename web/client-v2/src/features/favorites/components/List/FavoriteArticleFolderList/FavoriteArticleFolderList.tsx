"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getFavoriteArticleFolderListQuery } from "@/features/favorites/actions/getFavoriteArticleFolderListQuery";

import { NotFoundList } from "@/components/layout/NotFoundList";
import { Loader } from "@/components/ui/loader";

import { useStatusToast } from "@/hooks/useStatusToast";

import { serverRevalidatePage } from "@/actions/serverRevalidatePage";

import { FavoriteArticleFolderListFragment } from "./FavoriteArticleFolderListFragment";
import { FavoriteArticleFolderCard } from "../../Card";

type FavoriteArticleFolderListProps = {
  data: FragmentOf<typeof FavoriteArticleFolderListFragment>;
  user?: User;
  keyword?: string;
};

export const FavoriteArticleFolderList: FC<FavoriteArticleFolderListProps> = ({
  data,
  user,
  keyword,
}) => {
  const observerTarget = useRef(null);
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();

  const fragment = readFragment(FavoriteArticleFolderListFragment, data);

  const [edges, setEdges] = useState(fragment.edges);
  const [hashMore, setHashMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [endCursor, setEndCursor] = useState(fragment.pageInfo.endCursor);

  const flatFolders = edges ? edges.flatMap((edge) => edge.node) : [];

  const handleUpdateFavoriteArticleFolder = useCallback(
    async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description: string;
    }) => {
      if (!user) {
        failToast({
          description: "Please login to edit a  favorite folder",
        });
        await logoutToLoginPage();
        return;
      }
      await serverRevalidatePage(pathname);
    },
    [user, failToast, pathname]
  );

  const handleDeleteFavoriteArticleFolder = useCallback(
    async (id: string) => {
      // 1. login check
      if (!user) {
        failToast({
          description: "Please login to delete a  favorite folder",
        });
        await logoutToLoginPage();
        return;
      }
      await serverRevalidatePage(pathname);
    },
    [user, failToast, pathname]
  );

  const loadMore = useCallback(async () => {
    const { data: res, error } = await getFavoriteArticleFolderListQuery({
      first: 20,
      after: endCursor,
      keyword: keyword,
    });
    if (error) return;

    const newFolders = readFragment(
      FavoriteArticleFolderListFragment,
      res.favoriteArticleFolders
    );
    if (newFolders.pageInfo.hasNextPage) {
      const endCursor = newFolders.pageInfo?.endCursor || null;
      setEndCursor(endCursor);
    }

    if (newFolders.edges.length > 0) {
      setEdges((prev) => [...prev, ...newFolders.edges]);
      setHashMore(newFolders.edges.length > 0);
    }
  }, [endCursor, keyword]);

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
    setEdges(fragment.edges);
  }, [fragment.edges]);

  useEffect(() => {
    if (offset > 1) {
      loadMore();
    }
  }, [offset, hashMore]); // eslint-disable-line

  return (
    <>
      {edges.length === 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <NotFoundList message="No folder found" />
        </div>
      ) : (
        <div className="m-auto mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {edges.map((favoriteArticleFolder, i) => (
              <FavoriteArticleFolderCard
                key={`favorite-folder-${i}`}
                data={favoriteArticleFolder.node}
              />
            ))}
          </div>
          <div ref={observerTarget}>
            {hashMore && (
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
