import { graphql } from "gql.tada";

export const SelectMultiFavoriteFolderListQuery = graphql(`
  query SelectMultiFavoriteFolderListQuery(
    $input: FavoriteArticleFoldersInput
  ) {
    favoriteArticleFolders(input: $input) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);
