import { graphql } from "gql.tada";

export const FavoriteArticleFolderCardFragment = graphql(`
  fragment FavoriteArticleFolderCardFragment on FavoriteArticleFolder {
    id
    title
    description
    favoriteArticles {
      id
      title
      articleUrl
      thumbnailUrl
      createdAt
    }
  }
`);
