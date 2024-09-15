import { graphql } from "gql.tada";

export const LoggedBaseLayoutFragment = graphql(`
  fragment LoggedBaseLayoutFragment on Query {
    favoriteArticleFolders(input: $input) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`);
