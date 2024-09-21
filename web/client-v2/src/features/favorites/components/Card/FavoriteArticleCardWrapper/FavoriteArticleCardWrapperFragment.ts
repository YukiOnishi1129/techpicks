import { graphql } from "gql.tada";

import { FollowFavoriteArticleDropdownMenuContentFragment } from "../../DropdownMenu/FollowFavoriteArticleDropdownMenu/FollowFavoriteArticleDropdownMenuFragment";

export const FavoriteArticleCardWrapperFragment = graphql(`
  fragment FavoriteArticleCardWrapperFragment on FavoriteArticle {
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

export const FavoriteFolderFavoriteArticleCardWrapperFragment = graphql(
  `
    fragment FavoriteFolderFavoriteArticleCardWrapperFragment on FavoriteArticleFolderConnection {
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
