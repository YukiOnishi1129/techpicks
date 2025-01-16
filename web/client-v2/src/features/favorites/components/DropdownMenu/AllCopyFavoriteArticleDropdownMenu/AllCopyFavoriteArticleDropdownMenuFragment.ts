import { graphql } from "gql.tada";

import { AllCopyTargetFavoriteArticleFolderItemFragment } from "./AllCopyTargetFavoriteArticleFolderItemFragment";

export const AllCopyFavoriteArticleDropdownMenuContentFragment = graphql(
  `
    fragment AllCopyFavoriteArticleDropdownMenuContentFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          id
          title
          ...AllCopyTargetFavoriteArticleFolderItemFragment
        }
      }
    }
  `,
  [AllCopyTargetFavoriteArticleFolderItemFragment]
);
