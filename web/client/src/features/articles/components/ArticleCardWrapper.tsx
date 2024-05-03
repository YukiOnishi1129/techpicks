"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FC, useCallback, useMemo, useState } from "react";
import { TwitterShareButton, XIcon } from "react-share";

import { fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAPI } from "@/features/favoriteArticles/actions/favoriteArticle";
import { createFavoriteArticle } from "@/features/favoriteArticles/repository/favoriteArticle";

import { ReadPostTooltip } from "@/components/ui/tooltip/ReadPostTooltip";

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

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/article/${article.id}`;

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
            platformId: showArticle.platform.id,
            title: showArticle.title,
            description: showArticle.description,
            articleUrl: showArticle.articleUrl,
            publishedAt: showArticle.publishedAt,
            authorName: showArticle?.authorName,
            tags: showArticle?.tags,
            thumbnailURL: showArticle?.thumbnailURL,
            platformName: showArticle.platform.name,
            platformUrl: showArticle.platform.siteUrl,
            platformFaviconUrl: showArticle.platform.faviconUrl,
            isEng: showArticle.platform.isEng,
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
        return;
      }
      // 2. check out favoriteArticle by favoriteArticleFolderId and articleId
      const resCount =
        await fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAPI(
          {
            articleId: showArticle.id,
            favoriteArticleFolderId,
          }
        );
      if (resCount.data?.count && resCount.data.count > 0) {
        failToast({
          description: "You are already following the article",
        });
        return;
      }

      // 3. create favoriteArticle
      const createdId = await createFavoriteArticle({
        userId: user?.id || "",
        favoriteArticleFolderId: favoriteArticleFolderId,
        articleId: showArticle.id,
        platformId: showArticle.platform.id,
        title: showArticle.title,
        description: showArticle.description,
        articleUrl: showArticle.articleUrl,
        publishedAt: showArticle.publishedAt,
        authorName: showArticle?.authorName || undefined,
        tags: showArticle?.tags || undefined,
        thumbnailURL: showArticle?.thumbnailURL,
        platformName: showArticle.platform.name,
        platformUrl: showArticle.platform.siteUrl,
        platformFaviconUrl: showArticle.platform.faviconUrl,
        isEng: showArticle.platform.isEng,
        isRead: false,
        isPrivate: showArticle.isPrivate,
      });

      if (!createdId) {
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
            createdId
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
            createdId
          ),
        ]);
      }
      return createdId;
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
                    src={showArticle.platform.faviconUrl}
                    alt=""
                  />
                  <span className="hidden font-bold md:inline-block">
                    {showArticle.platform.name}
                  </span>
                </div>
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={showArticle.platform.faviconUrl}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-2 md:mr-4">
                <ReadPostTooltip postUrl={showArticle.articleUrl} size={24} />
              </div>
              <div className="mr-2 md:mr-4">
                <TwitterShareButton title={showArticle.title} url={shareUrl}>
                  <XIcon className="inline-block" size={36} />
                </TwitterShareButton>
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
                  <div className="mx-2  md:ml-4">
                    <FollowFavoriteArticleDropdownMenu
                      isFollowing={isFollowing}
                      articleId={showArticle.id}
                      favoriteArticleFolders={showFavoriteArticleFolders}
                      handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        </div>

        <ArticleDetailSheet article={showArticle} user={user}>
          <ArticleCard article={showArticle} user={user} tab={tab} />
        </ArticleDetailSheet>
      </div>
    </div>
  );
};
