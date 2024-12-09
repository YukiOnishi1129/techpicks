import { FragmentOf, graphql, readFragment } from "gql.tada";

import { FavoriteFolderUseFavoriteArticleFragment } from "@/features/articles/hooks/useFavoriteArticleMutation";

import { useStatusToast } from "@/hooks/useStatusToast";

export const UseBookmarkMangeFavoriteArticleMutation = graphql(`
  fragment UseBookmarkMangeFavoriteArticleMutation on Bookmark {
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

type UseBookmarkMutationParam = {
  data: FragmentOf<typeof UseBookmarkMangeFavoriteArticleMutation>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderUseFavoriteArticleFragment
  >;
};

export const useFavoriteArticleMutation = ({
  data,
  favoriteArticleFolders,
}: UseBookmarkMutationParam) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(UseBookmarkMangeFavoriteArticleMutation, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderUseFavoriteArticleFragment,
    favoriteArticleFolders
  );
};
