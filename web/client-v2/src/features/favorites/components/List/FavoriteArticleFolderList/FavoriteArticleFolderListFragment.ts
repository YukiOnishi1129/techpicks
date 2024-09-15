import { graphql } from "gql.tada";

export const FavoriteArticleFolderListFragment = graphql(`
  fragment FavoriteArticleFolderListFragment on FavoriteArticleFolderConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        title
        description
      }
    }
  }
`);
