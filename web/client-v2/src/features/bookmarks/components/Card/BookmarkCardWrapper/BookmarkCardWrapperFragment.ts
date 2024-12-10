import { graphql } from "gql.tada";

import {
  FavoriteFolderUseBookmarkManageFavoriteArticleFragment,
  UseBookmarkMangeFavoriteArticle,
} from "@/features/bookmarks/hooks/useBookmarkManageFavoriteArticle";
import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

import { BookmarkCardItemFragment } from "../BookmarkCardItem";

export const BookmarkCardWrapperFragment = graphql(
  `
    fragment BookmarkCardWrapperFragment on Bookmark {
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
      ...BookmarkCardItemFragment
      ...UseBookmarkMangeFavoriteArticle
    }
  `,
  [BookmarkCardItemFragment, UseBookmarkMangeFavoriteArticle]
);

export const FavoriteFolderBookmarkCardWrapperFragment = graphql(
  `
    fragment FavoriteFolderBookmarkCardWrapperFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          id
          title
        }
      }
      ...FollowFavoriteArticleDropdownMenuContentFragment
      ...FavoriteFolderUseBookmarkManageFavoriteArticleFragment
    }
  `,
  [
    FollowFavoriteArticleDropdownMenuContentFragment,
    FavoriteFolderUseBookmarkManageFavoriteArticleFragment,
  ]
);
