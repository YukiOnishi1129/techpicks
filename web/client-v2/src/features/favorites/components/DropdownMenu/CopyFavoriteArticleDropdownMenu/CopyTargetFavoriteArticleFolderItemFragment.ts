import { graphql } from "gql.tada";

export const CopyTargetFavoriteArticleFolderItemFragment = graphql(`
  fragment CopyTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
    id
    title
    favoriteArticles {
      id
      articleId
    }
  }
`);
