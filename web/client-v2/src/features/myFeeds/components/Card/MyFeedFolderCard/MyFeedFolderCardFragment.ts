import { graphql } from "gql.tada";

export const MyFeedFolderCardFragment = graphql(`
  fragment MyFeedFolderCardFragment on MyFeedFolder {
    id
    userId
    title
    description
    createdAt
    updatedAt
  }
`);
