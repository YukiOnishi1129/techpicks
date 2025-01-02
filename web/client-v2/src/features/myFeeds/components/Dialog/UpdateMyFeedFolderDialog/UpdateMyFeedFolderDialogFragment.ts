import { graphql } from "gql.tada";

import { UseManageMyFeedFolderFragment } from "@/features/myFeeds/hooks/UseManageMyFeedFolderFragment";

export const UpdateMyFeedFolderDialogFragment = graphql(
  `
    fragment UpdateMyFeedFolderDialogFragment on MyFeedFolder {
      id
      title
      description
      feeds {
        id
        name
      }
      ...UseManageMyFeedFolderFragment
    }
  `,
  [UseManageMyFeedFolderFragment]
);

export const FeedListUpdateMyFeedFolderDialogFragment = graphql(`
  fragment FeedListUpdateMyFeedFolderDialogFragment on FeedConnection {
    edges {
      node {
        id
        name
      }
    }
  }
`);
