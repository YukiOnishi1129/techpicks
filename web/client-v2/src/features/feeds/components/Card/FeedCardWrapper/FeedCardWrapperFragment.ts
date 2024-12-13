import { graphql } from "gql.tada";

import { FeedCardItemFragment } from "../FeedCardItem";

export const FeedCardWrapperFragment = graphql(
  `
    fragment FeedCardWrapperFragment on Feed {
      id
      platform {
        id
      }
      myFeedIds
      ...FeedCardItemFragment
    }
  `,
  [FeedCardItemFragment]
);
