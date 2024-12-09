import { FragmentOf, graphql, readFragment } from "gql.tada";

import { useStatusToast } from "@/hooks/useStatusToast";

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
};
