import { graphql } from "gql.tada";

export const MyFeedFolderLinkFragment = graphql(`
  fragment MyFeedFolderLinkFragment on MyFeedFolder {
    id
    title
  }
`);
