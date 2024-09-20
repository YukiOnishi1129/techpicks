"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useState, useTransition } from "react";

import { createFavoriteArticleMutation } from "@/features/favorites/actions/actCreateFavoriteArticleMutaion";
import { deleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleByArticleIdMutation";
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
  const [isPending, startTransition] = useTransition();
  const fragment = readFragment(ArticleCardWrapperFragment, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );
  const [isFollowing, setIsFollowing] = useState<boolean>(
    fragment.isFollowing || false
  );
  const [showArticle, setShowArticle] = useState(fragment);
  const [showFavoriteFolders, setShowFavoriteFolders] = useState(
    fragmentFavoriteFolder
  );

  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark(showArticle);

  const handleCreateFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string) => {
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
    [successToast, failToast, showArticle, isFollowing, ,]
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string, favoriteArticleId?: string) => {
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
      isFollowing,
      showArticle.id,
      showArticle.favoriteArticleFolderIds,
    ]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string, title: string) => {
      startTransition(async () => {
        const id = await handleCreateFavoriteArticle(favoriteArticleFolderId);
        if (!id) {
          failToast({
            description: "Fail: Something went wrong",
          });
          return;
        }

        setShowFavoriteFolders((prev) => {
          return {
            ...prev,
            favoriteArticleFolders: [
              ...prev.edges,
              {
                node: {
                  id,
                  title,
                },
              },
            ],
          };
        });
      });
    },
    [handleCreateFavoriteArticle, failToast]
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
                  {!isPending && (
                    <FollowFavoriteArticleDropdownMenu
                      data={showFavoriteFolders}
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
                  )}
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
