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

export const FeedsMyFeedFolderCardFragment = graphql(`
  fragment FeedsMyFeedFolderCardFragment on FeedConnection {
    edges {
      node {
        id
        name
        thumbnailUrl
        platform {
          id
          faviconUrl
        }
      }
    }
  }
`);
