import { graphql } from "gql.tada";

export const MyFeedFolderCardFragment = graphql(`
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
  }
`);
