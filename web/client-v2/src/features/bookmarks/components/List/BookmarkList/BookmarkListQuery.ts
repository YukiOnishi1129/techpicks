import { graphql } from "gql.tada";

import { BookmarkCardWrapperFragment } from "../../Card";

export const BookmarkListQuery = graphql(
  `
    query BookmarkListQuery($input: BookmarksInput!) {
      bookmarks(input: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            ...BookmarkCardWrapperFragment
          }
        }
      }
    }
  `,
  [BookmarkCardWrapperFragment]
);
