import { graphql } from "gql.tada";

export const FeedListQuery = graphql(`
  query FeedListQuery($input: FeedsInput!) {
    feeds(feedsInput: $input) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          description
          createdAt
        }
      }
    }
  }
`);
