import { graphql } from "gql.tada";

import { FavoriteArticleFolderListFragment } from "../../List";

export const FavoriteArticleFolderListTemplateFragment = graphql(
  `
    fragment FavoriteArticleFolderListTemplateFragment on Query {
      favoriteArticleFolders(input: $input) {
        ...FavoriteArticleFolderListFragment
      }
    }
  `,
  [FavoriteArticleFolderListFragment]
);
