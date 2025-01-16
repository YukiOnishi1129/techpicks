import { graphql } from "gql.tada";

import { CopyTargetFavoriteArticleFolderItemFragment } from "./CopyTargetFavoriteArticleFolderItemFragment";

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
