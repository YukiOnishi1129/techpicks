import { useMutation } from "@apollo/client";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";
import { CreateFavoriteArticleMutation } from "@/features/favorites/mutations/CreateFavoriteArticleMutation";
import { DeleteFavoriteArticleByArticleIdMutation } from "@/features/favorites/mutations/DeleteFavoriteArticleByArticleIdMutation";

import { serverRevalidatePage } from "@/shared/actions/actServerRevalidatePage";
import { useStatusToast } from "@/shared/hooks/useStatusToast";


export const UseBookmarkMangeFavoriteArticle = graphql(`
  fragment UseBookmarkMangeFavoriteArticle on Bookmark {
    id
    title
    description
    articleUrl
    thumbnailUrl
    publishedAt
    articleId
    platformId
    platformName
    platformUrl
    platformFaviconUrl
    isEng
    isRead
    createdAt
    updatedAt
    isFollowing
    favoriteArticleFolderIds
  }
`);

export const FavoriteFolderUseBookmarkManageFavoriteArticleFragment = graphql(`
  fragment FavoriteFolderUseBookmarkManageFavoriteArticleFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
  }
`);

type UseBookmarkManageFavoriteArticleParam = {
  data: FragmentOf<typeof UseBookmarkMangeFavoriteArticle>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderUseBookmarkManageFavoriteArticleFragment
  >;
};

export const useBookmarkManageFavoriteArticle = ({
  data,
  favoriteArticleFolders,
}: UseBookmarkManageFavoriteArticleParam) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(UseBookmarkMangeFavoriteArticle, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderUseBookmarkManageFavoriteArticleFragment,
    favoriteArticleFolders
  );

  const [createFavoriteArticleMutation] = useMutation(
    CreateFavoriteArticleMutation
  );

  const [deleteFavoriteArticleByArticleIdMutation] = useMutation(
    DeleteFavoriteArticleByArticleIdMutation
  );

  const handleCreateFavoriteArticle = useCallback(
    async (favoriteArticleFolderId: string, isCreatedFolder?: boolean) => {
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
            articleId: fragment.articleId,
            favoriteArticleFolderId,
            platformId: fragment.platformId,
            title: fragment.title,
            description: fragment?.description,
            articleUrl: fragment.articleUrl,
            publishedAt: fragment.publishedAt,
            thumbnailUrl: fragment.thumbnailUrl,
            platformName: fragment.platformName,
            platformUrl: fragment.platformUrl,
            platformFaviconUrl: fragment.platformFaviconUrl,
            isEng: fragment.isEng,
            isRead: false,
            isPrivate: false,
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
            if (isCreatedFolder) {
              cache.modify({
                id: cache.identify(fragmentFavoriteFolder),
                fields: {
                  edges: () => [
                    ...fragmentFavoriteFolder.edges,
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

      // Revalidate dashboard page
      await serverRevalidatePage("/dashboard/trend");
      await serverRevalidatePage("/dashboard/site");
      await serverRevalidatePage("/dashboard/company");
      await serverRevalidatePage("/dashboard/summary");

      // Revalidate favorite article page
      await serverRevalidatePage(`/favorite/article`);
      await serverRevalidatePage(
        `/favorite/article/${favoriteArticleFolderId}`
      );

      return data?.createFavoriteArticle.id;
    },
    [
      successToast,
      failToast,
      fragment,
      createFavoriteArticleMutation,
      fragmentFavoriteFolder,
    ]
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
            articleId: fragment.articleId,
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

      // Revalidate dashboard page
      await serverRevalidatePage("/dashboard/trend");
      await serverRevalidatePage("/dashboard/site");
      await serverRevalidatePage("/dashboard/company");
      await serverRevalidatePage("/dashboard/summary");

      // Revalidate favorite article page
      await serverRevalidatePage(`/favorite/article`);
      await serverRevalidatePage(
        `/favorite/article/${favoriteArticleFolderId}`
      );

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
      const id = await handleCreateFavoriteArticle(
        favoriteArticleFolderId,
        true
      );
      if (!id) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
    },
    [handleCreateFavoriteArticle, failToast]
  );

  return {
    handleCreateFavoriteArticle,
    handleRemoveFavoriteArticle,
    handleCreateFavoriteArticleFolder,
  };
};
