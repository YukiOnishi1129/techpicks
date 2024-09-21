import { graphql } from "gql.tada";

export const FavoriteArticleAllListFragment = graphql(`
  fragment FavoriteArticleAllListFragment on FavoriteAllFolderArticleConnection {
    edges {
      node {
        id
        title
        articleId
      }
      favoriteArticleFolders {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
`);
