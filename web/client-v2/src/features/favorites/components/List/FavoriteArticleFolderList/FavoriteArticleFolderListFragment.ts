import { graphql } from "gql.tada";

import { FavoriteArticleFolderCardFragment } from "../../Card";

export const FavoriteArticleFolderListFragment = graphql(
  `
    fragment FavoriteArticleFolderListFragment on FavoriteArticleFolderConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...FavoriteArticleFolderCardFragment
        }
      }
    }
  `,
  [FavoriteArticleFolderCardFragment]
);
