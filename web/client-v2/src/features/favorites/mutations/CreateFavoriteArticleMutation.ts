import { graphql } from "gql.tada";

export const CreateFavoriteArticleMutation = graphql(`
  mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
    createFavoriteArticle(input: $input) {
      id
      favoriteArticleFolderId
    }
  }
`);
