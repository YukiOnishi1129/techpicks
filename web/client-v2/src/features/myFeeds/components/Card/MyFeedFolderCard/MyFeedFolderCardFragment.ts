import { graphql } from "gql.tada";

import {
  FeedListUpdateMyFeedFolderDialogFragment,
  UpdateMyFeedFolderDialogFragment,
} from "../../Dialog/UpdateMyFeedFolderDialog/UpdateMyFeedFolderDialogFragment";

export const MyFeedFolderCardFragment = graphql(
  `
    fragment MyFeedFolderCardFragment on MyFeedFolder {
      id
      title
      description
      feeds {
        id
        name
        thumbnailUrl
        platform {
          id
          faviconUrl
        }
      }
      createdAt
      updatedAt
      ...UpdateMyFeedFolderDialogFragment
    }
  `,
  [UpdateMyFeedFolderDialogFragment]
);

export const FeedListMyFeedFolderCardFragment = graphql(
  `
    fragment FeedListMyFeedFolderCardFragment on FeedConnection {
      edges {
        node {
          id
          name
          thumbnailUrl
          platform {
            id
            faviconUrl
          }
        }
      }
      ...FeedListUpdateMyFeedFolderDialogFragment
    }
  `,
  [FeedListUpdateMyFeedFolderDialogFragment]
);
