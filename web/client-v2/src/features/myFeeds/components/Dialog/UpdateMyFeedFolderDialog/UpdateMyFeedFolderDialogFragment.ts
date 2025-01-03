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
