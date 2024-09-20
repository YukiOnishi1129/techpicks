"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useState } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { createFavoriteArticleMutation } from "@/features/favorites/actions/actCreateFavoriteArticleMutaion";
import { deleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleByArticleIdMutation";
import { deleteFavoriteArticleMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleMutation";
import { FollowFavoriteArticleDropdownMenu } from "@/features/favorites/components/DropdownMenu";

import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleTabType } from "@/types/article";

import { CreateFavoriteArticleInput } from "@/graphql/type";

import style from "./ArticleCardWrapper.module.css";
import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "./ArticleCardWrapperFragment";
import { useArticleBookmark } from "./useArticleBookmark";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "../../ToolTip";
import { ArticleCardItem } from "../ArticleCardItem";

type ArticleCardWrapperProps = {
  data: FragmentOf<typeof ArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderArticleCardWrapperFragment
  >;
  user: User;
  tab: ArticleTabType;
};

const TREND_TAB = "trend";

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  data,
  favoriteArticleFolders,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(ArticleCardWrapperFragment, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );
  const [isFollowing, setIsFollowing] = useState<boolean>(
    fragment.isFollowing || false
  );
  const [showArticle, setShowArticle] = useState(fragment);
  const [showFavoriteFolder, setShowFavoriteFolder] = useState(
    fragmentFavoriteFolder
  );

  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark(showArticle);

  const handleCreateFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string) => {
      if (!user) {
        failToast({
          description: "Please login to follow the article",
        });
        await logoutToLoginPage();
        return;
      }

      const input: CreateFavoriteArticleInput = {
        articleId: showArticle.id,
        favoriteArticleFolderId,
        platformId: showArticle.platform?.id,
        title: showArticle.title,
        description: showArticle?.description,
        articleUrl: showArticle.articleUrl,
        publishedAt: showArticle.publishedAt,
        authorName: showArticle.authorName,
        tags: showArticle.tags,
        thumbnailUrl: showArticle.thumbnailUrl,
        platformName: showArticle.platform?.name || "",
        platformUrl: showArticle.platform?.siteUrl || "",
        platformFaviconUrl: showArticle.platform?.faviconUrl || "",
        isEng: showArticle.isEng,
        isRead: false,
        isPrivate: showArticle.isPrivate,
      };

      const { data, error } = await createFavoriteArticleMutation(input);

      if (error || !data?.createFavoriteArticle) {
        if (error && error.length > 0) {
          // TODO: Modify the error message response on the BFF side
          const errMsg =
            error[0].message.indexOf("favorite article already exists") != -1
              ? "favorite article already exists"
              : error[0].message;
          failToast({
            description: errMsg,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      if (!isFollowing) setIsFollowing(true);
      setShowArticle((prev) => {
        return {
          ...prev,
          favoriteArticleFolderIds: [
            ...prev.favoriteArticleFolderIds,
            data.createFavoriteArticle.favoriteArticleFolderId,
          ],
        };
      });

      successToast({
        description: "Follow the article",
      });

      return data.createFavoriteArticle.id;
    },
    [successToast, failToast, user, showArticle, isFollowing, ,]
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string, favoriteArticleId?: string) => {
      if (!user) {
        failToast({
          description: "Please login to follow the article",
        });
        await logoutToLoginPage();
        return;
      }

      if (favoriteArticleId) {
        const { data, error } = await deleteFavoriteArticleMutation({
          id: favoriteArticleId,
        });

        if (error || !data?.deleteFavoriteArticle) {
          if (error || !data?.deleteFavoriteArticle) {
            if (error && error.length > 0) {
              // TODO: Modify the error message response on the BFF side
              const errMsg =
                error[0].message.indexOf("favorite article not found") != -1
                  ? "favorite article not found"
                  : error[0].message;
              failToast({
                description: errMsg,
              });
              return;
            }
            failToast({
              description: "Fail: Something went wrong",
            });
            return;
          }
        }
      } else {
        const { data, error } = await deleteFavoriteArticleByArticleIdMutation({
          articleId: showArticle.id,
          favoriteArticleFolderId,
        });

        if (error || !data?.deleteFavoriteArticleByArticleId) {
          if (error || !data?.deleteFavoriteArticleByArticleId) {
            if (error && error.length > 0) {
              // TODO: Modify the error message response on the BFF side
              const errMsg =
                error[0].message.indexOf("favorite article not found") != -1
                  ? "favorite article not found"
                  : error[0].message;
              failToast({
                description: errMsg,
              });
              return;
            }
            failToast({
              description: "Fail: Something went wrong",
            });
            return;
          }
        }
      }

      if (isFollowing)
        setIsFollowing(
          showArticle.favoriteArticleFolderIds.filter(
            (id) => id !== favoriteArticleFolderId
          ).length > 0
        );
      setShowArticle((prev) => ({
        ...prev,
        favoriteArticleFolderIds: prev.favoriteArticleFolderIds?.filter(
          (id) => id !== favoriteArticleFolderId
        ),
      }));

      successToast({
        description: "Unfollow the article",
      });

      return favoriteArticleId;
    },
    [
      successToast,
      failToast,
      user,
      isFollowing,
      showArticle.id,
      showArticle.favoriteArticleFolderIds,
    ]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string) => {
      const id = await handleCreateFavoriteArticle(favoriteArticleFolderId);
      if (!id) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Successfully followed the article",
      });
    },
    [handleCreateFavoriteArticle, successToast, failToast]
  );

  return (
    <div
      key={showArticle.id}
      className="mb-4 rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <>
            <div className="flex">
              {tab === TREND_TAB && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${showArticle.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {tab !== TREND_TAB ? (
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
                    data={showFavoriteFolder}
                    isFollowing={isFollowing}
                    followedFolderIds={
                      showArticle.favoriteArticleFolderIds || []
                    }
                    handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                    handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                    handleCreateFavoriteArticleFolder={
                      handleCreateFavoriteArticleFolder
                    }
                  />
                </div>
              </>
            </div>
          </>
        </div>

        <ArticleCardItem data={showArticle} user={user} tab={tab} />
      </div>
    </div>
  );
};
