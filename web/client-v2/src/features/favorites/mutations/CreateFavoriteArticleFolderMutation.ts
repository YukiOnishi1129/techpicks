import { graphql } from "gql.tada";

export const CreateFavoriteArticleFolderMutation = graphql(`
  mutation CreateFavoriteArticleFolderMutation(
    $input: CreateFavoriteArticleFolderInput!
  ) {
    createFavoriteArticleFolder(input: $input) {
      id
      title
    }
  }
`);
