import { graphql } from "gql.tada";

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
      ...BookmarkCardItemFragment
    }
  `,
  [BookmarkCardItemFragment]
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
    }
  `,
  [FollowFavoriteArticleDropdownMenuContentFragment]
);
