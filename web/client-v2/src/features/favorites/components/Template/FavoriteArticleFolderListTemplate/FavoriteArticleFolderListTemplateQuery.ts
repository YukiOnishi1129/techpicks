import { graphql } from "gql.tada";

import { FavoriteArticleFolderCardFragment } from "../../Card";

export const FavoriteArticleFolderListTemplateQuery = graphql(
  `
    query FavoriteArticleFolderListTemplateQuery(
      $input: FavoriteArticleFoldersInput!
    ) {
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
