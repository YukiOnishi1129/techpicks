"use client";
import { User } from "@supabase/supabase-js";
import { FC, useState, useCallback } from "react";

import { FollowFavoriteArticleDropdownMenu } from "@/features/articles/components/DropdownMenu";
import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { fetchFavoriteArticleFolderByIdAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import {
  fetchFavoriteArticleAPI,
  fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI,
} from "@/features/favoriteArticles/actions/favoriteArticle";
import {
  CreateFavoriteArticleDTO,
  createFavoriteArticle,
  deleteFavoriteArticle,
} from "@/features/favoriteArticles/repository/favoriteArticle";

import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import { BookmarkType } from "@/types/bookmark";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { BookmarkCardItem } from "./BookmarkCardItem";
import { DeleteBookmarkAlertDialog } from "../Dialog";
import { BookmarkDetailSheet } from "../Sheet/BookmarkDetailSheet";

type BookmarkCardWrapperProps = {
  bookmark: BookmarkType;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user: User | undefined;
};

export const BookmarkCardWrapper: FC<BookmarkCardWrapperProps> = ({
  bookmark,
  favoriteArticleFolders,
  user,
}: BookmarkCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    bookmark.isFollowing || false
  );
  const [showBookmark, setShowBookmark] = useState<BookmarkType>(bookmark);
  const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] = useState<
    Array<FavoriteArticleFolderType>
  >(favoriteArticleFolders);

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
            articleId: showBookmark.articleId,
            platformId: showBookmark.platformId,
            userId: targetFavoriteArticleFolder.userId,
            title: showBookmark.title,
            description: showBookmark.description,
            articleUrl: showBookmark.articleUrl,
            publishedAt: showBookmark.publishedAt,
            authorName: undefined,
            tags: undefined,
            thumbnailUrl: showBookmark.thumbnailUrl,
            platformName: showBookmark.platformName,
            platformUrl: showBookmark.platformUrl,
            platformFaviconUrl: showBookmark.platformFaviconUrl,
            isEng: showBookmark.isEng,
            isRead: false,
            isPrivate: false,
            createdAt: targetFavoriteArticleFolder.createdAt,
            updatedAt: targetFavoriteArticleFolder.updatedAt,
          },
        ],
      };
      return newFavoriteArticleFolder;
    },
    [showBookmark]
  );

  const handleCreateFavoriteArticle = useCallback(
    async (
      favoriteArticleFolderId: string,
      createdFavoriteArticleFolder?: FavoriteArticleFolderType
    ) => {
      // 1. check user
      if (!user) {
        failToast({
          description: "Please login to follow the article",
        });
        await logoutToLoginPage();
        return;
      }

      // 2. check out favoriteArticle by favoriteArticleFolderId and articleId
      const resCount =
        await fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI(
          {
            articleId: showBookmark.articleId,
            favoriteArticleFolderId,
            articleUrl: showBookmark.articleUrl,
          }
        );
      if (resCount.data?.count && resCount.data.count > 0) {
        failToast({
          description: "You are already following the article",
        });
        return;
      }

      const arg: CreateFavoriteArticleDTO = {
        userId: user.id,
        favoriteArticleFolderId: favoriteArticleFolderId,
        articleId: showBookmark?.articleId,
        platformId: showBookmark.platformId,
        title: showBookmark.title,
        description: showBookmark.description,
        articleUrl: showBookmark.articleUrl,
        thumbnailUrl: showBookmark?.thumbnailUrl,
        platformName: showBookmark.platformName,
        platformUrl: showBookmark.platformUrl,
        platformFaviconUrl: showBookmark.platformFaviconUrl,
        isEng: showBookmark.isEng,
        isRead: false,
        isPrivate: false,
      };

      if (showBookmark.publishedAt) {
        arg.publishedAt = showBookmark.publishedAt;
      }
      // 3. create favoriteArticle
      const createdData = await createFavoriteArticle(arg);

      if (!createdData) {
        failToast({
          description: "Failed to follow the article",
        });
        return;
      }
      successToast({
        description: "Followed the article",
      });

      // state update
      if (!isFollowing) setIsFollowing(true);
      if (createdFavoriteArticleFolder) {
        setShowFavoriteArticleFolders((prev) => [
          ...prev,
          addStateFavoriteArticleInFavoriteArticleFolder(
            createdFavoriteArticleFolder,
            createdData.id
          ),
        ]);
      }

      const targetFavoriteArticleFolder = showFavoriteArticleFolders.find(
        (favoriteArticleFolder) =>
          favoriteArticleFolder.id === favoriteArticleFolderId
      );
      if (targetFavoriteArticleFolder) {
        setShowFavoriteArticleFolders((prev) => [
          ...prev.filter(
            (favoriteArticleFolder) =>
              favoriteArticleFolder.id !== favoriteArticleFolderId
          ),
          addStateFavoriteArticleInFavoriteArticleFolder(
            targetFavoriteArticleFolder,
            createdData.id
          ),
        ]);
      }
      setShowBookmark({
        ...showBookmark,
        favoriteArticles: [
          ...(showBookmark.favoriteArticles || []),
          {
            id: createdData.id,
            favoriteArticleFolderId: favoriteArticleFolderId,
            articleId: createdData.id,
            platformId: createdData.platformId || undefined,
            userId: createdData.userId,
            title: createdData.title,
            description: createdData.description,
            articleUrl: createdData.articleUrl,
            publishedAt: createdData.publishedAt,
            authorName: createdData?.authorName || undefined,
            tags: createdData?.tags || undefined,
            thumbnailUrl: createdData.thumbnailUrl || "",
            platformName: createdData.platformName || "",
            platformUrl: createdData.platformUrl || "",
            platformFaviconUrl: createdData.platformFaviconUrl || "",
            isEng: createdData.isEng,
            isRead: createdData.isRead,
            isPrivate: createdData.isPrivate,
            createdAt: createdData.createdAt,
            updatedAt: createdData.updatedAt,
          },
        ],
      });

      return createdData.id;
    },
    [
      failToast,
      successToast,
      addStateFavoriteArticleInFavoriteArticleFolder,
      showBookmark,
      user,
      isFollowing,
      showFavoriteArticleFolders,
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
    async (favoriteArticleId: string, favoriteArticleFolderId: string) => {
      if (!user) {
        failToast({
          description: "Please login to unfollow the article",
        });
        await logoutToLoginPage();
        return;
      }

      // check count favoriteArticle by favoriteArticleId
      const res = await fetchFavoriteArticleAPI(favoriteArticleId);
      if (!res.data) {
        failToast({
          description: "Failed to unfollow the article",
        });
        return;
      }

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

      // state update
      // remove favoriteArticle from favoriteArticleFolder
      const targetFavoriteArticleFolder = showFavoriteArticleFolders.find(
        (favoriteArticleFolder) =>
          favoriteArticleFolder.id === favoriteArticleFolderId
      );
      if (targetFavoriteArticleFolder) {
        setShowFavoriteArticleFolders((prev) => [
          ...prev.filter(
            (favoriteArticleFolder) =>
              favoriteArticleFolder.id !== favoriteArticleFolderId
          ),
          {
            ...targetFavoriteArticleFolder,
            favoriteArticles:
              targetFavoriteArticleFolder.favoriteArticles.filter(
                (favoriteArticle) => favoriteArticle.id !== favoriteArticleId
              ),
          },
        ]);
      }

      if (showBookmark?.favoriteArticles) {
        const newBookmark: BookmarkType = {
          ...showBookmark,
          favoriteArticles: showBookmark.favoriteArticles.filter(
            (favoriteArticle) => favoriteArticle.id !== favoriteArticleId
          ),
        };
        setShowBookmark(newBookmark);
        if (
          !newBookmark?.favoriteArticles ||
          newBookmark.favoriteArticles.length === 0
        ) {
          setIsFollowing(false);
        }
      }
      return id;
    },
    [successToast, failToast, showFavoriteArticleFolders, showBookmark, user]
  );

  return (
    <div
      key={bookmark.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={bookmark.platformFaviconUrl}
                alt=""
              />
              <span className="hidden font-bold md:inline-block">
                {bookmark.platformName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={showBookmark.title}
                shareUrl={showBookmark.articleUrl}
              />
            </div>
            <DeleteBookmarkAlertDialog
              bookmarkId={showBookmark.id}
              bookmarkTitle={showBookmark.title}
            />
            <div className="ml-4">
              <FollowFavoriteArticleDropdownMenu
                isFollowing={isFollowing}
                articleId={showBookmark.articleId || ""}
                favoriteArticleFolders={showFavoriteArticleFolders}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              />
            </div>
          </div>
        </div>

        <BookmarkDetailSheet
          user={user}
          bookmark={bookmark}
          isFollowing={isFollowing}
          articleId={showBookmark.articleId || ""}
          favoriteArticleFolders={showFavoriteArticleFolders}
          handleCreateFavoriteArticle={handleCreateFavoriteArticle}
          handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        >
          <BookmarkCardItem bookmark={bookmark} />
        </BookmarkDetailSheet>
      </div>
    </div>
  );
};
