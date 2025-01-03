import { graphql } from "gql.tada";

export const MyFeedFolderListTemplateQuery = graphql(`
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
        endCursor
      }
    }
  }
`);
