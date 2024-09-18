"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { DeleteFavoriteArticleInput } from "@/graphql/type";

const DeleteFavoriteArticleMutation = graphql(`
  mutation DeleteFavoriteArticleMutation($input: DeleteFavoriteArticleInput!) {
    deleteFavoriteArticle(input: $input)
  }
`);

export const deleteFavoriteArticleMutation = async (
  input: DeleteFavoriteArticleInput
) => {
  const deleteFavoriteArticle = getClient().mutate({
    mutation: DeleteFavoriteArticleMutation,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      input,
    },
    errorPolicy: "all",
  });

  const res = await deleteFavoriteArticle;
  return { data: res.data, error: res.errors };
};
