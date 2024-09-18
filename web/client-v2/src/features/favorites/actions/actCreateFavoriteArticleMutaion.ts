"use server";

import { graphql } from "gql.tada";

const CreateFavoriteArticleMutation = graphql(`
  mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
    createFavoriteArticle(input: $input) {
      id
    }
  }
`);
