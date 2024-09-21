"use server";

import { graphql } from "gql.tada";

const CreateFavoriteArticleForUploadArticleMutation = graphql(`
  mutation CreateFavoriteArticleForUploadArticleMutation(
    $input: CreateFavoriteArticleForUploadArticleInput!
  ) {
    createFavoriteArticleForUploadArticle(input: $input) {
      id
    }
  }
`);
