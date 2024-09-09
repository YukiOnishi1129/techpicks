import { graphql } from "gql.tada";

export const ArticleCardItemFragment = graphql(`
  fragment ArticleCardItemFragment on Article {
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
    thumbnailUrl
    isEng
    isPrivate
    isBookmarked
    bookmarkId
    likeCount
    feeds {
      id
      name
    }
  }
`);
