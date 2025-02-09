import { graphql } from "gql.tada";

export const AllFolderFavoriteArticleCardItemFragment = graphql(`
  fragment AllFolderFavoriteArticleCardItemFragment on FavoriteAllFolderArticleEdge {
    node {
      id
      title
      articleUrl
      thumbnailUrl
      createdAt
    }
    favoriteArticleFolders {
      id
      title
    }
  }
`);
