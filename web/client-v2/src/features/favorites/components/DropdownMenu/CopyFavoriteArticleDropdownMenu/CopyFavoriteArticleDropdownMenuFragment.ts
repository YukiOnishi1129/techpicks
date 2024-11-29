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

export const CopyFavoriteArticleDropdownMenuContentFragment = graphql(
  `
    fragment CopyFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          id
          title
          ...CopyTargetFavoriteArticleFolderItemFragment
        }
      }
    }
  `,
  [CopyTargetFavoriteArticleFolderItemFragment]
);
