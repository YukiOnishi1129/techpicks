import { graphql } from "gql.tada";

import { FavoriteArticleFolderLinkFragment } from "../../Sidebar/FavoriteArticleFolderLink/FavoriteArticleFolderLinkFragment";

export const GetLoggedBaseLayoutQuery = graphql(
  `
    query GetLoggedBaseLayoutQuery($input: FavoriteArticleFoldersInput!) {
      favoriteArticleFolders(input: $input) {
        edges {
          node {
            ...FavoriteArticleFolderLinkFragment
          }
        }
      }
    }
  `,
  [FavoriteArticleFolderLinkFragment]
);
