import { graphql } from "gql.tada";

export const SelectMultiFeedListQuery = graphql(`
  query SelectMultiFeedListQuery($input: FeedsInput!) {
    feeds(feedsInput: $input) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          thumbnailUrl
        }
      }
    }
  }
`);
