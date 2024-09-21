import { graphql } from "gql.tada";

export const FavoriteArticleCardItemFragment = graphql(`
  fragment FavoriteArticleCardItemFragment on FavoriteArticle {
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
