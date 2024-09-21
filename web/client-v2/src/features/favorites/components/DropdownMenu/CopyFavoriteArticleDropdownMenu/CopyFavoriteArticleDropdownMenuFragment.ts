import { graphql } from "gql.tada";

export const CopyTargetFavoriteArticleFolderItemFragment = graphql(`
  fragment CopyTargetFavoriteArticleFolderItemFragment on FavoriteArticleFolder {
    id
    title
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
