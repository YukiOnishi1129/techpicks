import { graphql } from "gql.tada";

import { ShowMyFeedListDialogContentFragment } from "./ShowMyFeedListDialogContentFragment";

export const ShowMyFeedListDialogFragment = graphql(
  `
    fragment ShowMyFeedListDialogFragment on MyFeedFolder {
      id
      feeds {
        id
        name
        description
        thumbnailUrl
        platform {
          faviconUrl
        }
        ...ShowMyFeedListDialogContentFragment
      }
    }
  `,
  [ShowMyFeedListDialogContentFragment]
);
