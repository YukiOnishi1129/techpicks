import { graphql } from "gql.tada";

export const FavoriteArticleFolderLinkFragment = graphql(`
  fragment FavoriteArticleFolderLinkFragment on FavoriteArticleFolder {
    id
    title
  }
`);
