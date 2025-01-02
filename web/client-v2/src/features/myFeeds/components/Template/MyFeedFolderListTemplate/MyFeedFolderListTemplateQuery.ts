import { graphql } from "gql.tada";

import { FeedsMyFeedFolderCardFragment } from "../../Card/MyFeedFolderCard/MyFeedFolderCardFragment";

export const MyFeedFolderListTemplateQuery = graphql(
  `
    query MyFeedFolderListTemplateQuery(
      $myFeedFoldersInput: MyFeedFoldersInput!
      $feedsInput: FeedsInput!
    ) {
      myFeedFolders(myFeedFoldersInput: $myFeedFoldersInput) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
          }
        }
      }
      feeds(feedsInput: $feedsInput) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            name
          }
        }
        ...FeedsMyFeedFolderCardFragment
      }
    }
  `,
  [FeedsMyFeedFolderCardFragment]
);
