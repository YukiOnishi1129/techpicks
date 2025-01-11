import { graphql } from "gql.tada";

export const CreateMultiFolderFavoriteArticleDialogFragment = graphql(`
  fragment CreateMultiFolderFavoriteArticleDialogFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
`);
