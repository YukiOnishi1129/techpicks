import { graphql } from "gql.tada";

import {
  ArticleUseFavoriteArticleFragment,
  FavoriteFolderUseFavoriteArticleFragment,
} from "@/features/articles/hooks/useFavoriteArticleMutation";
import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

import { UseArticleBookmarkFragment } from "../../../hooks/useArticleBookmark";
import { ArticleCardItemFragment } from "../ArticleCardItem";

export const ArticleCardWrapperFragment = graphql(
  `
    fragment ArticleCardWrapperFragment on Article {
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
      ...ArticleCardItemFragment
      ...UseArticleBookmarkFragment
      ...ArticleUseFavoriteArticleFragment
    }
  `,
  [
    ArticleCardItemFragment,
    UseArticleBookmarkFragment,
    ArticleUseFavoriteArticleFragment,
  ]
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
      ...FavoriteFolderUseFavoriteArticleFragment
    }
  `,
  [
    FollowFavoriteArticleDropdownMenuContentFragment,
    FavoriteFolderUseFavoriteArticleFragment,
  ]
);
