import { graphql } from "gql.tada";

import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

import { ArticleCardItemFragment } from "../ArticleCardItem";

export const ArticleCardWrapperFragment = graphql(
  `
    fragment ArticleCardWrapperFragment on Article {
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
      ...ArticleCardItemFragment
    }
  `,
  [ArticleCardItemFragment]
);

export const FavoriteFolderArticleCardWrapperFragment = graphql(
  `
    fragment FavoriteFolderArticleCardWrapperFragment on FavoriteArticleFolderConnection {
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
