"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback, useState } from "react";

import { fetchFavoriteArticleFolderByIdAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";

import { ShareLinks } from "@/components/ui/share";

import { useCheckImageExist } from "@/hooks/useImage";
import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { FavoriteArticleType } from "@/types/favoriteArticle";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { RemoveFavoriteArticleAlertDialog } from "./Dialog/RemoveFavoriteArticleAlertDialog";
import { CopyFavoriteArticleDropdownMenu } from "./DropdownMenu";
import { FavoriteArticleCard } from "./FavoriteArticleCard";
import { FavoriteArticleDetailSheet } from "./FavoriteArticleDetailSheet";
import {
  fetchFavoriteArticleAPI,
  fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI,
} from "../actions/favoriteArticle";
import {
  createFavoriteArticle,
  deleteFavoriteArticle,
} from "../repository/favoriteArticle";

type FavoriteArticleCardWrapperProps = {
  user?: User;
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
  otherFavoriteArticleFolders: Array<FavoriteArticleFolderType>;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({
  user,
  favoriteArticleFolderId,
  favoriteArticle,
  otherFavoriteArticleFolders,
}) => {
  const faviconImageUrl = useCheckImageExist(
    favoriteArticle?.platformFaviconUrl || "undefined"
  );
  const { successToast, failToast } = useStatusToast();
  const { revalidatePage } = useServerRevalidatePage();

  const [showOtherFavoriteArticleFolders, setShowOtherFavoriteArticleFolders] =
    useState(otherFavoriteArticleFolders);

  const addStateFavoriteArticleInFavoriteArticleFolder = useCallback(
    (
      targetFavoriteArticleFolder: FavoriteArticleFolderType,
      favoriteArticleId: string
    ): FavoriteArticleFolderType => {
      const newFavoriteArticleFolder: FavoriteArticleFolderType = {
        ...targetFavoriteArticleFolder,
        favoriteArticles: [
          ...targetFavoriteArticleFolder.favoriteArticles,
          {
            id: favoriteArticleId,
            favoriteArticleFolderId: targetFavoriteArticleFolder.id,
            articleId: favoriteArticle.articleId,
            platformId: favoriteArticle.platformId,
            title: favoriteArticle.title,
            description: favoriteArticle.description,
            articleUrl: favoriteArticle.articleUrl,
            publishedAt: favoriteArticle.publishedAt,
            authorName: favoriteArticle?.authorName,
            tags: favoriteArticle?.tags,
            thumbnailURL: favoriteArticle?.thumbnailURL,
            platformName: favoriteArticle.platformName,
            platformUrl: favoriteArticle.platformUrl,
            platformFaviconUrl: favoriteArticle.platformFaviconUrl,
            isEng: favoriteArticle.isEng,
            isRead: favoriteArticle.isRead,
            isPrivate: favoriteArticle.isPrivate,
          },
        ],
      };
      return newFavoriteArticleFolder;
    },
    [favoriteArticle]
  );

  const handleCreateFavoriteArticle = useCallback(
    async (
      targetFavoriteArticleFolderId: string,
      createdFavoriteArticleFolder?: FavoriteArticleFolderType
    ) => {
      // 1. check user
      if (!user) {
        failToast({
          description: "Please login to follow the article",
        });
        return;
      }
      // 2. check out favoriteArticle by favoriteArticleFolderId and articleId
      const resCount =
        await fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI(
          {
            articleId: favoriteArticle.articleId,
            favoriteArticleFolderId: targetFavoriteArticleFolderId,
            articleUrl: favoriteArticle.articleUrl,
          }
        );
      if (resCount.data?.count && resCount.data.count > 0) {
        failToast({
          description: "You are already following the article",
        });
        return;
      }

      // 3. create favoriteArticle
      const createdData = await createFavoriteArticle({
        userId: user?.id || "",
        favoriteArticleFolderId: targetFavoriteArticleFolderId,
        articleId: favoriteArticle.articleId || "",
        platformId: favoriteArticle.platformId || undefined,
        title: favoriteArticle.title,
        description: favoriteArticle.description,
        articleUrl: favoriteArticle.articleUrl,
        publishedAt: favoriteArticle?.publishedAt || undefined,
        authorName: favoriteArticle?.authorName || undefined,
        tags: favoriteArticle?.tags || undefined,
        thumbnailURL: favoriteArticle.thumbnailURL || undefined,
        platformName: favoriteArticle.platformName || undefined,
        platformUrl: favoriteArticle.platformUrl || undefined,
        platformFaviconUrl: favoriteArticle.platformFaviconUrl || undefined,
        isEng: favoriteArticle.isEng,
        isRead: favoriteArticle.isRead,
        isPrivate: favoriteArticle.isPrivate,
      });

      if (!createdData) {
        failToast({
          description: "Failed to follow the article",
        });
        return;
      }
      successToast({
        description: "Followed the article",
      });

      if (createdFavoriteArticleFolder) {
        setShowOtherFavoriteArticleFolders((prev) => [
          ...prev,
          addStateFavoriteArticleInFavoriteArticleFolder(
            createdFavoriteArticleFolder,
            createdData.id
          ),
        ]);
        return createdData.id;
      }

      if (targetFavoriteArticleFolderId === favoriteArticleFolderId) {
        return createdData.id;
      }

      const targetFavoriteArticleFolder = showOtherFavoriteArticleFolders.find(
        (favoriteArticleFolder) =>
          favoriteArticleFolder.id === targetFavoriteArticleFolderId
      );
      if (targetFavoriteArticleFolder) {
        setShowOtherFavoriteArticleFolders((prev) => [
          ...prev.filter(
            (favoriteArticleFolder) =>
              favoriteArticleFolder.id !== targetFavoriteArticleFolderId
          ),
          addStateFavoriteArticleInFavoriteArticleFolder(
            targetFavoriteArticleFolder,
            createdData.id
          ),
        ]);
      }
      return createdData.id;
    },
    [
      failToast,
      successToast,
      user,
      favoriteArticle,
      showOtherFavoriteArticleFolders,
      favoriteArticleFolderId,
      addStateFavoriteArticleInFavoriteArticleFolder,
    ]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string) => {
      const res = await fetchFavoriteArticleFolderByIdAPI(
        favoriteArticleFolderId
      );
      const newFavoriteArticleFolder = res.data.favoriteArticleFolder;
      const id = await handleCreateFavoriteArticle(
        favoriteArticleFolderId,
        newFavoriteArticleFolder
      );
      if (!id) {
        successToast({
          description: "Successfully followed the article",
        });
      }
    },
    [handleCreateFavoriteArticle, successToast]
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleId: string, favoriteArticleFolderId?: string) => {
      // check count favoriteArticle by favoriteArticleId
      const res = await fetchFavoriteArticleAPI(favoriteArticleId);
      if (!res.data) {
        failToast({
          description: "Failed to unfollow the article",
        });
        return;
      }
      if (!user) {
        failToast({
          description: "Please login to unfollow the article",
        });
        return;
      }
      // delete favoriteArticle
      const id = await deleteFavoriteArticle({
        id: favoriteArticleId,
        userId: user.id,
      });
      if (!id) {
        failToast({
          description: "Failed to unfollow the article",
        });
        return;
      }
      successToast({
        description: "Successfully unfollowed the article",
      });

      if (favoriteArticleFolderId) {
        setShowOtherFavoriteArticleFolders((prev) =>
          prev.map((favoriteArticleFolder) => {
            if (favoriteArticleFolder.id === favoriteArticleFolderId) {
              const newFavoriteArticles =
                favoriteArticleFolder.favoriteArticles.filter(
                  (favoriteArticle) => favoriteArticle.id !== favoriteArticleId
                );
              return {
                ...favoriteArticleFolder,
                favoriteArticles: newFavoriteArticles,
              };
            }
            return favoriteArticleFolder;
          })
        );
      }

      return id;
    },
    [successToast, failToast, user]
  );

  const handleRemoveFavoriteArticleCard = useCallback(
    async (favoriteArticleId: string) => {
      const id = await handleRemoveFavoriteArticle(favoriteArticleId);
      if (!id) return;
      await revalidatePage();
      return id;
    },
    [handleRemoveFavoriteArticle, revalidatePage]
  );

  return (
    <div
      key={favoriteArticle.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div className="border-t-4 border-t-rose-600">
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={faviconImageUrl}
                alt=""
              />
              <span className="hidden font-bold md:inline-block">
                {favoriteArticle.platformName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={favoriteArticle.title}
                shareUrl={favoriteArticle.articleUrl}
              />
            </div>
            <div className="mr-4">
              <CopyFavoriteArticleDropdownMenu
                articleId={favoriteArticle.articleId || ""}
                favoriteArticleFolders={showOtherFavoriteArticleFolders}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              />
            </div>
            <div>
              <RemoveFavoriteArticleAlertDialog
                favoriteArticleId={favoriteArticle.id}
                favoriteArticleTitle={favoriteArticle.title}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
              />
            </div>
          </div>
        </div>

        <FavoriteArticleDetailSheet
          favoriteArticle={favoriteArticle}
          otherFavoriteArticleFolders={showOtherFavoriteArticleFolders}
          handleCreateFavoriteArticle={handleCreateFavoriteArticle}
          handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        >
          <FavoriteArticleCard favoriteArticle={favoriteArticle} />
        </FavoriteArticleDetailSheet>
      </div>
    </div>
  );
};
