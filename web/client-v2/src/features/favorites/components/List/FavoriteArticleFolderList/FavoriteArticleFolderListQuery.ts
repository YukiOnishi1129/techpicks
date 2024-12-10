import { graphql } from "gql.tada";

import { FavoriteArticleFolderCardFragment } from "../../Card";

export const FavoriteArticleFolderListQuery = graphql(
  `
    query FavoriteArticleFolderListQuery($input: FavoriteArticleFoldersInput!) {
      favoriteArticleFolders(input: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            ...FavoriteArticleFolderCardFragment
          }
        }
      }
    }
  `,
  [FavoriteArticleFolderCardFragment]
);
