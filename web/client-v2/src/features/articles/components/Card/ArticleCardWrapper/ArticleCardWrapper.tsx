"use client";

import { useMutation } from "@apollo/client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { FC, useCallback, useState, useTransition } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { FollowFavoriteArticleDropdownMenu } from "@/features/favorites/components/DropdownMenu";

import { IconTitleLink } from "@/components/ui/link";
import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import { ArticleTabType } from "@/types/article";

import style from "./ArticleCardWrapper.module.css";
import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "./ArticleCardWrapperFragment";
import { useArticleBookmark } from "../../../hooks/useArticleBookmark";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "../../ToolTip";
import { ArticleCardItem } from "../ArticleCardItem";

const CreateFavoriteArticleMutation = graphql(`
  mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
    createFavoriteArticle(input: $input) {
      id
      favoriteArticleFolderId
    }
  }
`);

const DeleteFavoriteArticleByArticleIdMutation = graphql(`
  mutation DeleteFavoriteArticleByArticleIdMutation(
    $input: DeleteFavoriteArticleByArticleIdInput!
  ) {
    deleteFavoriteArticleByArticleId(input: $input)
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

  const { handleCreateBookmark, handleDeleteBookmark } =
    useArticleBookmark(fragment);

  const [createFavoriteArticleMutation] = useMutation(
    CreateFavoriteArticleMutation
  );

  const [deleteFavoriteArticleByArticleIdMutation] = useMutation(
    DeleteFavoriteArticleByArticleIdMutation
  );

  const [showFavoriteFolders, setShowFavoriteFolders] = useState(
    fragmentFavoriteFolder
  );

  const handleCreateFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to add favorite article",
        });
        await logoutToLoginPage();
        return;
      }

      const { data, errors } = await createFavoriteArticleMutation({
        variables: {
          input: {
            articleId: fragment.id,
            favoriteArticleFolderId,
            platformId: fragment.platform?.id,
            title: fragment.title,
            description: fragment?.description,
            articleUrl: fragment.articleUrl,
            publishedAt: fragment.publishedAt,
            authorName: fragment.authorName,
            tags: fragment.tags,
            thumbnailUrl: fragment.thumbnailUrl,
            platformName: fragment.platform?.name || "",
            platformUrl: fragment.platform?.siteUrl || "",
            platformFaviconUrl: fragment.platform?.faviconUrl || "",
            isEng: fragment.isEng,
            isRead: false,
            isPrivate: fragment.isPrivate,
          },
        },
        update: (cache, { data }) => {
          if (data?.createFavoriteArticle) {
            const newFavoriteArticle = data.createFavoriteArticle;
            cache.modify({
              id: cache.identify(fragment),
              fields: {
                isFollowing: () => true,
                favoriteArticleFolderIds: () => [
                  ...fragment.favoriteArticleFolderIds,
                  newFavoriteArticle.favoriteArticleFolderId,
                ],
              },
            });
          }
        },
      });

      if (errors) {
        if (errors.length > 0) {
          // TODO: Modify the error message response on the BFF side
          const errMsg =
            errors[0].message.indexOf("favorite article already exists") != -1
              ? "favorite article already exists"
              : errors[0].message;
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

      successToast({
        description: `Follow the article title:【 ${fragment.title} 】`,
      });

      return data?.createFavoriteArticle.id;
    },
    [successToast, failToast, fragment, createFavoriteArticleMutation]
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string, favoriteArticleId?: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to unfollow favorite article",
        });
        await logoutToLoginPage();
        return;
      }
      const deletedTitle = fragment.title;
      const { errors } = await deleteFavoriteArticleByArticleIdMutation({
        variables: {
          input: {
            articleId: fragment.id,
            favoriteArticleFolderId,
          },
        },
        update: (cache) => {
          const newFavoriteArticleFolderIds =
            fragment.favoriteArticleFolderIds?.filter(
              (id) => id !== favoriteArticleFolderId
            );
          cache.modify({
            id: cache.identify(fragment),
            fields: {
              isFollowing: () => newFavoriteArticleFolderIds.length > 0,
              favoriteArticleFolderIds: () => newFavoriteArticleFolderIds,
            },
          });
        },
      });

      if (errors) {
        if (errors.length > 0) {
          // TODO: Modify the error message response on the BFF side
          const errMsg =
            errors[0].message.indexOf("favorite article not found") != -1
              ? "favorite article not found"
              : errors[0].message;
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

      successToast({
        description: `Unfollow the article title: 【 ${deletedTitle} 】`,
      });

      return favoriteArticleId;
    },
    [
      successToast,
      failToast,
      fragment,
      deleteFavoriteArticleByArticleIdMutation,
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
                      isFollowing={fragment.isFollowing}
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
