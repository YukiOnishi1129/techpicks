import { graphql } from "gql.tada";

export const BookmarkListFragment = graphql(`
  fragment BookmarkListFragment on BookmarkConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      # cursor
      node {
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
      }
    }
  }
`);
