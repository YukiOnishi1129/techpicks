import { graphql } from "gql.tada";

import { UseArticleManageBookmarkFragment } from "@/features/articles/hooks/useArticleManageBookmark";
import {
  UseArticleManageFavoriteArticleFragment,
  FavoriteFolderUseArticleManageFavoriteArticleFragment,
} from "@/features/articles/hooks/useArticleManageFavoriteArticle";
import { FollowFavoriteArticleDropdownMenuContentFragment } from "@/features/favorites/components/DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

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
      comment {
        id
        comment
      }
      favoriteArticleFolderIds
      ...ArticleCardItemFragment
      ...UseArticleManageBookmarkFragment
      ...UseArticleManageFavoriteArticleFragment
    }
  `,
  [
    ArticleCardItemFragment,
    UseArticleManageBookmarkFragment,
    UseArticleManageFavoriteArticleFragment,
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
      ...FavoriteFolderUseArticleManageFavoriteArticleFragment
    }
  `,
  [
    FollowFavoriteArticleDropdownMenuContentFragment,
    FavoriteFolderUseArticleManageFavoriteArticleFragment,
  ]
);
