"use client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { FC, useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { serverRevalidatePage } from "@/actions/serverAction";

import { FavoriteArticleFolderCard } from "./FavoriteArticleFolderCard";
import { fetchFavoriteArticleFolderByIdAPI } from "../../actions/favoriteArticleFolders";
import {
  deleteFavoriteArticleFolder,
  updateFavoriteArticleFolder,
} from "../../repository/favoriteArticleFolder";

type FavoriteArticleFolderListProps = {
  initialFavoriteArticleFolders: FavoriteArticleFolderType[];
  user?: User;
};

export const FavoriteArticleFolderList: FC<FavoriteArticleFolderListProps> = ({
  initialFavoriteArticleFolders,
  user,
}) => {
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();

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
      // 1. folder check
      const fetchRes = await fetchFavoriteArticleFolderByIdAPI(id);
      if (fetchRes.status === 401) {
        failToast({
          description: "Fail: Unauthorized",
        });
        return;
      }
      if (fetchRes.status !== 200) {
        failToast({
          description: "Fail: Folder not found",
        });
        return;
      }
      // 2. update
      const updatedId = await updateFavoriteArticleFolder({
        id,
        title,
        description,
        userId: user.id,
      });
      if (!updatedId) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Success: Update folder",
      });
      await serverRevalidatePage(pathname);
    },
    [user, successToast, failToast, pathname]
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
      // 2. folder check
      const fetchRes = await fetchFavoriteArticleFolderByIdAPI(id);
      if (fetchRes.status === 401) {
        failToast({
          description: "Fail: Unauthorized",
        });
        return;
      }
      if (fetchRes.status !== 200) {
        failToast({
          description: "Fail: Folder not found",
        });
        return;
      }
      // 3. delete folder
      const deletedId = await deleteFavoriteArticleFolder(id);
      if (!deletedId) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Success: Delete folder",
      });
      await serverRevalidatePage(pathname);
    },
    [user, successToast, failToast, pathname]
  );

  return (
    <>
      {initialFavoriteArticleFolders.length === 0 ? (
        <div>
          <NotFoundList message="No folder found" />
        </div>
      ) : (
        <div className="m-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {initialFavoriteArticleFolders.map((favoriteArticleFolder) => (
              <FavoriteArticleFolderCard
                key={`${favoriteArticleFolder.id}`}
                favoriteArticleFolder={favoriteArticleFolder}
                handleUpdateFavoriteArticleFolder={
                  handleUpdateFavoriteArticleFolder
                }
                handleDeleteFavoriteArticleFolder={
                  handleDeleteFavoriteArticleFolder
                }
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
