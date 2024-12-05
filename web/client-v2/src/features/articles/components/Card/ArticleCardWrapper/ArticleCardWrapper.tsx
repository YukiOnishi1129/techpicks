"use client";

import { useMutation } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { FC, useCallback, useState, useTransition } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { createFavoriteArticleMutation } from "@/features/favorites/actions/actCreateFavoriteArticleMutaion";
import { deleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleByArticleIdMutation";
import { FollowFavoriteArticleDropdownMenu } from "@/features/favorites/components/DropdownMenu";

import { IconTitleLink } from "@/components/ui/link";
import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleTabType } from "@/types/article";

import { CreateFavoriteArticleInput } from "@/graphql/type";

import style from "./ArticleCardWrapper.module.css";
import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "./ArticleCardWrapperFragment";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "../../ToolTip";
import { ArticleCardItem } from "../ArticleCardItem";

const CreateArticleBookmarkMutation = graphql(`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(createBookmarkInput: $input) {
      id
    }
  }
`);

const DeleteArticleBookmarkMutation = graphql(`
  mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
    deleteBookmark(deleteBookmarkInput: $input)
  }
`);

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

  const [createArticleBookmarkMutation] = useMutation(
    CreateArticleBookmarkMutation
  );

  const [deleteArticleBookmarkMutation] = useMutation(
    DeleteArticleBookmarkMutation
  );

  const [isFollowing, setIsFollowing] = useState<boolean>(
    fragment.isFollowing || false
  );
  const [showArticle, setShowArticle] = useState(fragment);
  const [showFavoriteFolders, setShowFavoriteFolders] = useState(
    fragmentFavoriteFolder
  );

  const handleCreateBookmark = useCallback(async () => {
    const user = await getUser();
    if (!user) {
      failToast({
        description: "Fail: Please login to bookmark this article",
      });
      await logoutToLoginPage();
      return;
    }

    const { errors } = await createArticleBookmarkMutation({
      variables: {
        input: {
          articleId: fragment.id,
          userId: user.id,
          platformId: fragment.platform?.id,
          title: fragment.title,
          description: fragment.description,
          articleUrl: fragment.articleUrl,
          thumbnailUrl: fragment.thumbnailUrl,
          publishedAt: fragment.publishedAt,
          platformName: fragment.platform?.name || "",
          platformUrl: fragment.platform?.siteUrl || "",
          platformFaviconUrl: fragment.platform?.faviconUrl || "",
          isEng: fragment.isEng,
          isRead: false,
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(fragment),
          fields: {
            isBookmarked: () => true,
            bookmarkId: () => data?.createBookmark.id,
          },
        });
      },
    });

    if (errors) {
      if (errors.length > 0) {
        failToast({
          description: errors[0].message,
        });
        return;
      }
      failToast({
        description: "Fail: Something went wrong",
      });
      return;
    }

    successToast({
      description: `Add bookmark title 【 ${fragment.title} 】`,
    });
  }, [createArticleBookmarkMutation, fragment, successToast, failToast]);

  const handleDeleteBookmark = useCallback(
    async (bookmarkId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
        });
        await logoutToLoginPage();
        return;
      }

      const { errors } = await deleteArticleBookmarkMutation({
        variables: {
          input: {
            bookmarkId,
            userId: user.id,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify(fragment),
            fields: {
              isBookmarked: () => false,
              bookmarkId: () => null,
            },
          });
        },
      });

      if (errors) {
        if (errors.length > 0) {
          failToast({
            description: errors[0].message,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }

      successToast({
        description: `Remove bookmark title 【 ${fragment.title} 】`,
      });
    },
    [deleteArticleBookmarkMutation, fragment, failToast, successToast]
  );

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

  // useEffect(() => {
  //   console.log("❤️‍🔥");
  //   console.log(fragment.title);
  //   console.log(fragment?.bookmarkId);
  // }, [fragment?.bookmarkId, fragment.title]);

  return (
    <div
      key={fragment.id}
      className="rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2"
    >
      <div className="grid gap-4">
        <div className="flex h-16 justify-between border-b-2 py-4 md:px-6">
          <>
            <div className="flex">
              {tab === TREND_TAB && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${fragment.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {tab !== TREND_TAB ? (
                <IconTitleLink
                  url={fragment.platform?.siteUrl || ""}
                  iconImageUrl={fragment.platform?.faviconUrl || ""}
                  title={fragment.platform?.name || ""}
                  target="_blank"
                />
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={fragment.platform?.faviconUrl || ""}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4">
              <div>
                <ShareLinks
                  shareTitle={fragment.title}
                  shareUrl={fragment.articleUrl}
                />
              </div>

              <>
                {fragment?.bookmarkId ? (
                  <DeleteBookmarkTooltip
                    bookmarkId={fragment?.bookmarkId || ""}
                    handleRemoveBookmark={handleDeleteBookmark}
                  />
                ) : (
                  <AddBookmarkTooltip
                    handleAddBookmark={handleCreateBookmark}
                  />
                )}
                <div className="mt-2">
                  {!isPending && (
                    <FollowFavoriteArticleDropdownMenu
                      data={showFavoriteFolders}
                      isFollowing={isFollowing}
                      followedFolderIds={
                        fragment.favoriteArticleFolderIds || []
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

        <div>
          <ArticleCardItem data={fragment} user={user} tab={tab} />
        </div>
      </div>
    </div>
  );
};
