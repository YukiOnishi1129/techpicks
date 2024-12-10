import { graphql } from "gql.tada";

export const DeleteFavoriteArticleFolderMutation = graphql(`
  mutation DeleteFavoriteArticleFolderMutation(
    $input: DeleteFavoriteArticleFolderInput!
  ) {
    deleteFavoriteArticleFolder(input: $input)
  }
`);
