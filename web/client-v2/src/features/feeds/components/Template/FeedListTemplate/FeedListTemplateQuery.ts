import { graphql } from "gql.tada";

import { FeedCardWrapperFragment } from "../../Card";

export const FeedListTemplateQuery = graphql(
  `
    query FeedListTemplateQuery($input: FeedsInput!) {
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
