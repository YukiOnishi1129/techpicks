"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FC, useCallback, useMemo, useState } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { fetchFavoriteArticleFolderByIdAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import {
  fetchFavoriteArticleAPI,
  fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI,
} from "@/features/favoriteArticles/actions/favoriteArticle";
import {
  createFavoriteArticle,
  deleteFavoriteArticle,
} from "@/features/favoriteArticles/repository/favoriteArticle";

import { ShareLinks } from "@/components/ui/share/ShareLinks";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleTabType, ArticleType } from "@/types/article";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { ArticleCard } from "./ArticleCard";
import style from "./ArticleCardWrapper.module.css";
import { ArticleDetailSheet } from "./ArticleDetailSheet";
import { FollowFavoriteArticleDropdownMenu } from "./DropdownMenu";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "./Tooltip";
import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleCardWrapperProps = {
  article: ArticleType;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  article,
  favoriteArticleFolders,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    article.isFollowing || false
  );
  const [showArticle, setShowArticle] = useState<ArticleType>(article);
  const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] = useState<
    Array<FavoriteArticleFolderType>
  >(favoriteArticleFolders);

  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  const isShowLikeCount = useMemo(
    () => article?.likeCount !== undefined,
    [article?.likeCount]
  );

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
            articleId: showArticle.id,
            platformId: showArticle.platform?.id || null,
            title: showArticle.title,
            description: showArticle.description,
            articleUrl: showArticle.articleUrl,
            publishedAt: showArticle.publishedAt,
            authorName: showArticle?.authorName,
            tags: showArticle?.tags,
            thumbnailURL: showArticle?.thumbnailUrl,
            platformName: showArticle.platform?.name || null,
            platformUrl: showArticle.platform?.siteUrl || null,
            platformFaviconUrl: showArticle.platform?.faviconUrl || null,
            isEng: showArticle.platform?.isEng || false,
            isRead: false,
            isPrivate: showArticle.isPrivate,
          },
        ],
      };
      return newFavoriteArticleFolder;
    },
    [showArticle]
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
            articleId: showArticle.id,
            favoriteArticleFolderId,
            articleUrl: showArticle.articleUrl,
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
        favoriteArticleFolderId: favoriteArticleFolderId,
        articleId: showArticle.id,
        platformId: showArticle.platform?.id,
        title: showArticle.title,
        description: showArticle.description,
        articleUrl: showArticle.articleUrl,
        publishedAt: showArticle?.publishedAt || undefined,
        authorName: showArticle?.authorName || undefined,
        tags: showArticle?.tags || undefined,
        thumbnailURL: showArticle?.thumbnailUrl,
        platformName: showArticle.platform?.name,
        platformUrl: showArticle.platform?.siteUrl,
        platformFaviconUrl: showArticle.platform?.faviconUrl,
        isEng: showArticle.platform?.isEng,
        isRead: false,
        isPrivate: showArticle.isPrivate,
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
      setShowArticle({
        ...showArticle,
        favoriteArticles: [
          ...(showArticle.favoriteArticles || []),
          {
            id: createdData.id,
            favoriteArticleFolderId: favoriteArticleFolderId,
            articleId: createdData.id,
            platformId: createdData.platformId,
            title: createdData.title,
            description: createdData.description,
            articleUrl: createdData.articleUrl,
            publishedAt: createdData.publishedAt,
            authorName: createdData?.authorName,
            tags: createdData?.tags,
            thumbnailURL: createdData?.thumbnailUrl,
            platformName: createdData.platformName,
            platformUrl: createdData.platformUrl,
            platformFaviconUrl: createdData.platformFaviconUrl,
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
      showArticle,
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

      if (showArticle?.favoriteArticles) {
        const newArticle: ArticleType = {
          ...showArticle,
          favoriteArticles: showArticle.favoriteArticles.filter(
            (favoriteArticle) => favoriteArticle.id !== favoriteArticleId
          ),
        };
        setShowArticle(newArticle);
        if (
          !newArticle?.favoriteArticles ||
          newArticle.favoriteArticles.length === 0
        ) {
          setIsFollowing(false);
        }
      }
      return id;
    },
    [successToast, failToast, showFavoriteArticleFolders, showArticle, user]
  );

  return (
    <div
      key={showArticle.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div className="border-t-4 border-t-rose-600">
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <>
            <div className="flex">
              {isShowLikeCount && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${showArticle.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {showArticle?.likeCount === undefined ? (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 inline-block size-[36px] bg-white"
                    src={showArticle.platform?.faviconUrl || ""}
                    alt=""
                  />
                  <span className="hidden font-bold md:inline-block">
                    {showArticle.platform?.name || ""}
                  </span>
                </div>
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={showArticle.platform?.faviconUrl || ""}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-4">
                <ShareLinks
                  shareTitle={showArticle.title}
                  shareUrl={showArticle.articleUrl}
                />
              </div>

              {user && (
                <>
                  {bookmarkId ? (
                    <DeleteBookmarkTooltip
                      bookmarkId={bookmarkId}
                      handleRemoveBookmark={handleRemoveBookmark}
                    />
                  ) : (
                    <AddBookmarkTooltip
                      articleId={showArticle.id}
                      handleAddBookmark={handleAddBookmark}
                    />
                  )}
                  <div className="mx-4  mt-2">
                    <FollowFavoriteArticleDropdownMenu
                      isFollowing={isFollowing}
                      articleId={showArticle.id}
                      favoriteArticleFolders={showFavoriteArticleFolders}
                      handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                      handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                      handleCreateFavoriteArticleFolder={
                        handleCreateFavoriteArticleFolder
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </>
        </div>

        <ArticleDetailSheet
          article={showArticle}
          user={user}
          bookmarkId={bookmarkId}
          isFollowing={isFollowing}
          favoriteArticleFolders={showFavoriteArticleFolders}
          handleAddBookmark={handleAddBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
          handleCreateFavoriteArticle={handleCreateFavoriteArticle}
          handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        >
          <ArticleCard article={showArticle} user={user} tab={tab} />
        </ArticleDetailSheet>
      </div>
    </div>
  );
};
