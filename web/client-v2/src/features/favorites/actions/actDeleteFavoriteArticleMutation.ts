"use server";

import { graphql } from "gql.tada";

const DeleteFavoriteArticleMutation = graphql(`
  mutation DeleteFavoriteArticleMutation($input: DeleteFavoriteArticleInput!) {
    deleteFavoriteArticle(input: $input)
  }
`);
