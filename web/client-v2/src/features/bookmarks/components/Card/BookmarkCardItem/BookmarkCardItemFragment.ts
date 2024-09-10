import { graphql } from "gql.tada";

export const BookmarkCardItemFragment = graphql(`
  fragment BookmarkCardItemFragment on Bookmark {
    id
    title
    thumbnailUrl
    createdAt
  }
`);
