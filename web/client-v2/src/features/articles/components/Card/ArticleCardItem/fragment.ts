import { graphql } from "gql.tada";

export const ArticleCardItemFragment = graphql(`
  fragment ArticleCardItemFragment on Article {
    id
    platform {
      id
      name
      faviconUrl
    }
    title
    articleUrl
    publishedAt
    thumbnailUrl
    isEng
    isPrivate
    isBookmarked
    bookmarkId
    likeCount
  }
`);
