import { useMutation, type Reference, type StoreObject } from "@apollo/client";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import { useStatusToast } from "@/shared/hooks/useStatusToast";

import { CreateFavoriteArticleMutation } from "../mutations/CreateFavoriteArticleMutation";
import { DeleteFavoriteArticleByArticleIdMutation } from "../mutations/DeleteFavoriteArticleByArticleIdMutation";

export const UseManageAllFolderFavoriteArticleFragment = graphql(`
  fragment UseManageAllFolderFavoriteArticleFragment on FavoriteArticle {
    id
    articleId
    platformId
    favoriteArticleFolderId
    userId
    title
    description
    thumbnailUrl
    articleUrl
    publishedAt
    authorName
    tags
    platformName
    platformUrl
    platformFaviconUrl
    isEng
    isPrivate
    isRead
    createdAt
    updatedAt
  }
`);

export const FavoriteFolderUseManageAllFolderFavoriteArticleFragment = graphql(`
  fragment FavoriteFolderUseManageAllFolderFavoriteArticleFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
  }
`);

type UseManageAllFolderFavoriteArticleParam = {
  data: FragmentOf<typeof UseManageAllFolderFavoriteArticleFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderUseManageAllFolderFavoriteArticleFragment
  >;
};

export const useManageAllFolderFavoriteArticle = ({
  data,
  favoriteArticleFolders,
}: UseManageAllFolderFavoriteArticleParam) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(
    UseManageAllFolderFavoriteArticleFragment,
    data
  );
  const fragmentFavoriteFolders = readFragment(
    FavoriteFolderUseManageAllFolderFavoriteArticleFragment,
    favoriteArticleFolders
  );

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
          cache.modify({
            id: cache.identify({
              __typename: "FavoriteArticle",
              id: fragment.id,
            }),
            fields: {
              favoriteArticleFolders(
                existingFavoriteArticleFolders = [],
                { readField }
              ) {
                const targetFavoriteArticleFolder =
                  existingFavoriteArticleFolders.filter(
                    (itemRef: Reference | StoreObject | undefined) =>
                      readField("id", itemRef) !== targetFavoriteArticleFolderId
                  );
                if (!targetFavoriteArticleFolder)
                  return existingFavoriteArticleFolders;
                return existingFavoriteArticleFolders.concat({
                  __ref: cache.identify({
                    __typename: "FavoriteArticleFolder",
                    id: targetFavoriteArticleFolderId,
                    title: targetFavoriteArticleFolder?.title,
                  }),
                });
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

      // Revalidate the page to update the favorite article list
      await serverRevalidatePage(
        `/favorite/article/${targetFavoriteArticleFolderId}`
      );

      return resData?.createFavoriteArticle.id;
    },
    [
      failToast,
      fragment,
      successToast,
      fragmentFavoriteFolders,
      createFavoriteArticleMutation,
    ]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string, title: string) => {
      const id = await handleCreateFavoriteArticle(
        favoriteArticleFolderId,
        true
      );
      if (!id) {
        failToast({
          description: `Fail: Something went wrong, article: '${title}'`,
        });
        return;
      }
    },
    [handleCreateFavoriteArticle, failToast]
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
          cache.modify({
            id: cache.identify({
              __typename: "FavoriteArticle",
              id: fragment.id,
            }),
            fields: {
              favoriteArticleFolders(
                existingFavoriteArticleFolders = [],
                { readField }
              ) {
                return existingFavoriteArticleFolders.filter(
                  (itemRef: Reference | StoreObject | undefined) =>
                    readField("id", itemRef) !== targetFavoriteArticleFolderId
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

      // Revalidate the page to update the favorite article list
      await serverRevalidatePage(
        `/favorite/article/${targetFavoriteArticleFolderId}`
      );

      return favoriteArticleId;
    },
    [
      failToast,
      successToast,
      fragment,
      fragmentFavoriteFolders,
      deleteFavoriteArticleByArticleIdMutation,
    ]
  );

  //   const handleRemoveFavoriteArticleCard = useCallback(
  //     async (favoriteArticleId: string) => {
  //       const id = await handleRemoveFavoriteArticle(
  //         favoriteArticleId,
  //         fragment.favoriteArticleFolderId
  //       );
  //       if (!id) return;
  //       return id;
  //     },
  //     [handleRemoveFavoriteArticle, fragment]
  //   );

  return {
    handleCreateFavoriteArticle,
    handleCreateFavoriteArticleFolder,
    handleRemoveFavoriteArticle,
  };
};
