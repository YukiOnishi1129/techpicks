import { graphql } from "gql.tada";

import { CopyTargetFavoriteArticleFolderItemFragment } from "../CopyFavoriteArticleDropdownMenu/CopyTargetFavoriteArticleFolderItemFragment";

export const AllCopyFavoriteArticleDropdownMenuContentFragment = graphql(
  `
    fragment AllCopyFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
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
