import { graphql } from "gql.tada";

export const FeedListTemplateQuery = graphql(`
  query FeedListTemplateQuery($input: FeedsInput!) {
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
