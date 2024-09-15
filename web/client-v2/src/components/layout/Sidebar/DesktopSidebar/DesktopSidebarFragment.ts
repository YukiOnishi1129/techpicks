import { graphql } from "gql.tada";

import { FavoriteArticleFolderLinkFragment } from "../FavoriteArticleFolderLink/FavoriteArticleFolderLinkFragment";

export const DeskTopSidebarFragment = graphql(
  `
    fragment DeskTopSidebarFragment on Query {
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
