import { graphql } from "gql.tada";

export const MyFeedFolderListTemplateQuery = graphql(`
  query MyFeedFolderListTemplateQuery(
    $myFeedFoldersInput: MyFeedFoldersInput!
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
  }
`);
