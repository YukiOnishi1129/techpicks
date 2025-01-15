import { graphql } from "gql.tada";

export const AllCopyTargetFavoriteArticleFolderItemFragment = graphql(`
  fragment AllCopyTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
    id
    title
    favoriteArticles {
      id
      articleId
    }
  }
`);
