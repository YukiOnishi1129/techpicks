"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback } from "react";

import { useMutation, type Reference, type StoreObject } from "@apollo/client";

import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import {
  FavoriteArticleCardWrapperFragment,
  FavoriteFolderFavoriteArticleCardWrapperFragment,
} from "./FavoriteArticleCardWrapperFragment";
import { RemoveFavoriteArticleAlertDialog } from "../../Dialog";
import { CopyFavoriteArticleDropdownMenu } from "../../DropdownMenu/CopyFavoriteArticleDropdownMenu";
import { FavoriteArticleCardItem } from "../FavoriteArticleCardItem";
import { CreateFavoriteArticleMutation } from "@/features/favorites/mutations/CreateFavoriteArticleMutation";
import { DeleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/mutations/DeleteFavoriteArticleByArticleIdMutation";
import { IconTitleLink } from "@/components/ui/link";
import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { deleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/actions/actDeleteFavoriteArticleByArticleIdMutation";

type FavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof FavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
  favoriteArticleFolderId: string;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders, favoriteArticleFolderId }) => {
  const fragment = readFragment(FavoriteArticleCardWrapperFragment, data);
  const fragmentFavoriteFolders = readFragment(
    FavoriteFolderFavoriteArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const { successToast, failToast } = useStatusToast();

  const [createFavoriteArticleMutation] = useMutation(
    CreateFavoriteArticleMutation
  );

  const [deleteFavoriteArticleByArticleIdMutation] = useMutation(
    DeleteFavoriteArticleByArticleIdMutation
  );

  const handleCreateFavoriteArticle = useCallback(
    async (
      targetFavoriteArticleFolderId: string,
      isCreatedFolder?: boolean
    ) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to add favorite article",
        });
        await logoutToLoginPage();
        return;
      }

      const { data: resData, errors } = await createFavoriteArticleMutation({
        variables: {
          input: {
            articleId: fragment.articleId,
            favoriteArticleFolderId: targetFavoriteArticleFolderId,
            platformId: fragment?.platformId,
            title: fragment.title,
            description: fragment?.description,
            articleUrl: fragment.articleUrl,
            publishedAt: fragment.publishedAt,
            authorName: fragment.authorName,
            tags: fragment.tags,
            thumbnailUrl: fragment.thumbnailUrl,
            platformName: fragment.platformName,
            platformUrl: fragment.platformUrl,
            platformFaviconUrl: fragment.platformFaviconUrl,
            isEng: fragment.isEng,
            isRead: false,
            isPrivate: fragment.isPrivate,
          },
        },
        update: (cache, { data }) => {
          if (!data?.createFavoriteArticle) return;
          const newFavoriteArticle = data.createFavoriteArticle;
          if (isCreatedFolder) {
            cache.modify({
              id: cache.identify(fragmentFavoriteFolders),
              fields: {
                edges: () => [
                  ...fragmentFavoriteFolders.edges,
                  {
                    node: {
                      id: newFavoriteArticle.favoriteArticleFolderId,
                      title: fragment.title,
                    },
                  },
                ],
              },
            });
          }
          cache.modify({
            id: cache.identify({
              __typename: "FavoriteArticleFolder",
              id: targetFavoriteArticleFolderId,
            }),
            fields: {
              favoriteArticles(existingFavoriteArticles = []) {
                return [newFavoriteArticle, ...existingFavoriteArticles];
              },
            },
          });
        },
      });

      if (errors && errors.length > 0) {
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

      const folderTitle = fragmentFavoriteFolders.edges.find((edge) => {
        return edge.node.id === targetFavoriteArticleFolderId;
      });
      successToast({
        description: `Follow the article title: '${fragment.title}' into the folder ${folderTitle}`,
      });

      return resData?.createFavoriteArticle.id;
    },
    [failToast, fragment, favoriteArticleFolderId, successToast]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string, title: string) => {
      await handleCreateFavoriteArticle(favoriteArticleFolderId, true);
    },
    [handleCreateFavoriteArticle]
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (
      favoriteArticleId: string,
      targetFavoriteArticleFolderId: string
    ) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to unfollow favorite article",
        });
        await logoutToLoginPage();
        return;
      }

      const { errors } = await deleteFavoriteArticleByArticleIdMutation({
        variables: {
          input: {
            articleId: fragment.articleId,
            favoriteArticleFolderId: targetFavoriteArticleFolderId,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({
              __typename: "FavoriteArticleFolder",
              id: targetFavoriteArticleFolderId,
            }),
            fields: {
              favoriteArticles(existingFavoriteArticles = [], { readField }) {
                return existingFavoriteArticles.filter(
                  (itemRef: Reference | StoreObject | undefined) =>
                    readField("id", itemRef) !== favoriteArticleId
                );
              },
            },
          });
        },
      });

      if (errors && errors.length > 0) {
        failToast({
          description: errors[0].message,
        });
        return;
      }

      const targetFolder = fragmentFavoriteFolders.edges.find((edge) => {
        return edge.node.id === targetFavoriteArticleFolderId;
      });

      successToast({
        description: `Unfollowed the article title '${fragment.title}' from the folder '${targetFolder?.node.title}'`,
      });

      return favoriteArticleId;
    },
    [failToast, successToast]
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
            <IconTitleLink
              url={fragment.platformUrl}
              iconImageUrl={fragment.platformFaviconUrl}
              title={fragment.platformName}
              target="_blank"
            />
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
                data={fragmentFavoriteFolders}
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
