import { graphql } from "gql.tada";

export const UpdateFavoriteArticleFolderMutation = graphql(`
  mutation UpdateFavoriteArticleFolderMutation(
    $input: UpdateFavoriteArticleFolderInput!
  ) {
    updateFavoriteArticleFolder(input: $input) {
      id
    }
  }
`);
