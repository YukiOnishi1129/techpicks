import { graphql } from "gql.tada";

export const MyFeedFolderListQuery = graphql(`
  query MyFeedFolderListQuery($myFeedFoldersInput: MyFeedFoldersInput!) {
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
  }
`);
