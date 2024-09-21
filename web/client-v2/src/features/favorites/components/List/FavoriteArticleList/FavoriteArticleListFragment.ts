import { graphql } from "gql.tada";

export const FavoriteArticleListFragment = graphql(`
  fragment FavoriteArticleListFragment on FavoriteArticleConnection {
    edges {
      node {
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
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`);
