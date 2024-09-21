"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useState } from "react";

import { createFavoriteArticleMutation } from "@/features/favorites/actions/actCreateFavoriteArticleMutaion";
import { deleteFavoriteArticleMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleMutation";

import { ShareLinks } from "@/components/ui/share";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";
import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { CreateFavoriteArticleInput } from "@/graphql/type";

import {
  FavoriteArticleCardWrapperFragment,
  FavoriteFolderFavoriteArticleCardWrapperFragment,
} from "./FavoriteArticleCardWrapperFragment";
import { RemoveFavoriteArticleAlertDialog } from "../../Dialog";
import { CopyFavoriteArticleDropdownMenu } from "../../DropdownMenu/CopyFavoriteArticleDropdownMenu";
import { FavoriteArticleCardItem } from "../FavoriteArticleCardItem";

type FavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof FavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
  user?: User;
  favoriteArticleFolderId: string;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders, user, favoriteArticleFolderId }) => {
  const fragment = readFragment(FavoriteArticleCardWrapperFragment, data);
  const fragmentFolders = readFragment(
    FavoriteFolderFavoriteArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const faviconImageUrl = useCheckImageExist(fragment.platformFaviconUrl);
  const { successToast, failToast } = useStatusToast();
  const { revalidatePage } = useServerRevalidatePage();

  const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] =
    useState(fragmentFolders);

  const handleCreateFavoriteArticle = useCallback(
    async (targetFavoriteArticleFolderId: string) => {
      const input: CreateFavoriteArticleInput = {
        articleId: fragment.articleId,
        favoriteArticleFolderId: targetFavoriteArticleFolderId,
        platformId: fragment.platformId,
        title: fragment.title,
        description: fragment.description,
        articleUrl: fragment.articleUrl,
        publishedAt: fragment.publishedAt,
        authorName: fragment.authorName,
        tags: fragment.tags,
        thumbnailUrl: fragment.thumbnailUrl,
        platformName: fragment.platformName,
        platformUrl: fragment.platformUrl,
        platformFaviconUrl: fragment.platformFaviconUrl,
        isEng: fragment.isEng,
        isRead: fragment.isRead,
        isPrivate: fragment.isPrivate,
      };
      // 3. create favoriteArticle
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
      successToast({
        description: "Follow the article",
      });

      if (targetFavoriteArticleFolderId === favoriteArticleFolderId) {
        return data.createFavoriteArticle.id;
      }

      const targetFavoriteArticleFolder = showFavoriteArticleFolders.edges.find(
        (favoriteArticleFolder) =>
          favoriteArticleFolder.node.id === targetFavoriteArticleFolderId
      );

      if (targetFavoriteArticleFolder) {
        setShowFavoriteArticleFolders((prev) => {
          return {
            ...prev,
            edges: prev.edges.map((edge) => {
              if (edge.node.id === targetFavoriteArticleFolderId) {
                return {
                  ...edge,
                  node: {
                    ...edge.node,
                    favoriteArticles: [
                      ...edge.node.favoriteArticles,
                      {
                        id: data.createFavoriteArticle.id,
                        articleId: fragment.articleId,
                      },
                    ],
                  },
                };
              }
              return edge;
            }),
          };
        });
      }

      await revalidatePage();

      return data.createFavoriteArticle.id;
    },
    [
      failToast,
      fragment,
      favoriteArticleFolderId,
      successToast,
      showFavoriteArticleFolders.edges,
      revalidatePage,
    ]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string) => {},
    []
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (
      favoriteArticleId: string,
      targetFavoriteArticleFolderId: string
    ) => {
      // delete favoriteArticle
      const { data, error } = await deleteFavoriteArticleMutation({
        id: favoriteArticleId,
      });

      if (error || !data?.deleteFavoriteArticle) {
        if (error && error.length > 0) {
          failToast({
            description: error[0].message,
          });
          return;
        }
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Successfully unfollowed the article",
      });

      setShowFavoriteArticleFolders((prev) => {
        return {
          ...prev,
          edges: prev.edges.map((edge) => {
            if (edge.node.id === targetFavoriteArticleFolderId) {
              return {
                ...edge,
                node: {
                  ...edge.node,
                  favoriteArticles: edge.node.favoriteArticles.filter(
                    (favoriteArticle) =>
                      favoriteArticle.id !== favoriteArticleId
                  ),
                },
              };
            }
            return edge;
          }),
        };
      });

      await revalidatePage();

      return favoriteArticleId;
    },
    [failToast, successToast, revalidatePage]
  );

  const handleRemoveFavoriteArticleCard = useCallback(
    async (favoriteArticleId: string) => {
      const id = await handleRemoveFavoriteArticle(
        favoriteArticleId,
        fragment.favoriteArticleFolderId
      );
      if (!id) return;
      return id;
    },
    [handleRemoveFavoriteArticle, fragment]
  );

  return (
    <div
      key={fragment.id}
      className="mb-4 rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
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
                {fragment.platformName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={fragment.title}
                shareUrl={fragment.articleUrl}
              />
            </div>
            <div className="mr-4">
              <CopyFavoriteArticleDropdownMenu
                data={showFavoriteArticleFolders}
                articleId={fragment.articleId}
                targetFavoriteFolderId={fragment.favoriteArticleFolderId}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              />
            </div>
            <div>
              <RemoveFavoriteArticleAlertDialog
                favoriteArticleId={fragment.id}
                favoriteArticleTitle={fragment.title}
                targetFavoriteArticleFolderId={fragment.favoriteArticleFolderId}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
              />
            </div>
          </div>
        </div>

        <FavoriteArticleCardItem data={fragment} />
      </div>
    </div>
  );
};
