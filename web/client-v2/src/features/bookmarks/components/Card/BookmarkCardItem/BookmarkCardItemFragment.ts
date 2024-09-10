import { graphql } from "gql.tada";

export const BookmarkCardItemFragment = graphql(`
  fragment BookmarkCardItemFragment on Bookmark {
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
`);
