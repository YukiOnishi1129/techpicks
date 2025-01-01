import { graphql } from "gql.tada";

import { MyFeedFolderCardFragment } from "../../Card/MyFeedFolderCard/MyFeedFolderCardFragment";

export const MyFeedFolderListQuery = graphql(
  `
    query MyFeedFolderListQuery($myFeedFoldersInput: MyFeedFoldersInput!) {
      myFeedFolders(myFeedFoldersInput: $myFeedFoldersInput) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            ...MyFeedFolderCardFragment
          }
        }
      }
    }
  `,
  [MyFeedFolderCardFragment]
);
