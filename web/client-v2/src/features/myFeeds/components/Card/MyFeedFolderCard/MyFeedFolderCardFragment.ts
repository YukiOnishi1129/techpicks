import { graphql } from "gql.tada";

import { ShowMyFeedListDialogFragment } from "../../Dialog/ShowMyFeedListDialog/ShowMyFeedListDialogFragment";
import { UpdateMyFeedFolderDialogFragment } from "../../Dialog/UpdateMyFeedFolderDialog/UpdateMyFeedFolderDialogFragment";

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
      ...ShowMyFeedListDialogFragment
    }
  `,
  [UpdateMyFeedFolderDialogFragment, ShowMyFeedListDialogFragment]
);
