import { graphql } from "gql.tada";

import { AllFolderFavoriteArticleCardWrapperFragment } from "../../Card";

export const AllFolderFavoriteArticleListFragment = graphql(
  `
    fragment AllFolderFavoriteArticleListFragment on FavoriteAllFolderArticleConnection {
      edges {
        node {
          id
        }
        ...AllFolderFavoriteArticleCardWrapperFragment
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `,
  [AllFolderFavoriteArticleCardWrapperFragment]
);
