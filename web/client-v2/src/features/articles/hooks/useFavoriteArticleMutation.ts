import { useMutation } from "@apollo/client";
import { FragmentOf, graphql, readFragment } from "gql.tada";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

export const ArticleUseFavoriteArticleFragment = graphql(`
  fragment ArticleUseFavoriteArticleFragment on Article {
    __typename
    id
    platform {
      id
      name
      siteUrl
      faviconUrl
    }
    title
    description
    articleUrl
    publishedAt
    authorName
    tags
    thumbnailUrl
    isEng
    isPrivate
    isBookmarked
    bookmarkId
    likeCount
    isFollowing
    favoriteArticleFolderIds
  }
`);

export const FavoriteFolderUseFavoriteArticleFragment = graphql(`
  fragment FavoriteFolderUseFavoriteArticleFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
  }
`);

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

type UseFavoriteArticleMutationParam = {
  data: FragmentOf<typeof ArticleUseFavoriteArticleFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderUseFavoriteArticleFragment
  >;
};

export const useFavoriteArticleMutation = ({
  data,
  favoriteArticleFolders,
}: UseFavoriteArticleMutationParam) => {
  console.log("❤️‍🔥");
  console.log(process.env.BFF_API_URL);
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(ArticleUseFavoriteArticleFragment, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderUseFavoriteArticleFragment,
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
