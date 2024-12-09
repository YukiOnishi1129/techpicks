import { graphql } from "gql.tada";

export const DeleteFavoriteArticleByArticleIdMutation = graphql(`
  mutation DeleteFavoriteArticleByArticleIdMutation(
    $input: DeleteFavoriteArticleByArticleIdInput!
  ) {
    deleteFavoriteArticleByArticleId(input: $input)
  }
`);
