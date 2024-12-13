import { graphql } from "gql.tada";

import { FeedCardWrapperFragment } from "../../Card";

export const FeedListQuery = graphql(
  `
    query FeedListQuery($input: FeedsInput!) {
      feeds(feedsInput: $input) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            ...FeedCardWrapperFragment
          }
        }
      }
    }
  `,
  [FeedCardWrapperFragment]
);
