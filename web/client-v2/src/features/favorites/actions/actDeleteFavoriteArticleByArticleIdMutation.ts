"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { DeleteFavoriteArticleByArticleIdInput } from "@/graphql/type";

const DeleteFavoriteArticleByArticleIdMutation = graphql(`
  mutation DeleteFavoriteArticleByArticleIdMutation(
    $input: DeleteFavoriteArticleByArticleIdInput!
  ) {
    deleteFavoriteArticleByArticleId(input: $input)
  }
`);

export const deleteFavoriteArticleByArticleIdMutation = async (
  input: DeleteFavoriteArticleByArticleIdInput
) => {
  const deleteFavoriteArticleByArticleId = getClient().mutate({
    mutation: DeleteFavoriteArticleByArticleIdMutation,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      input,
    },
    errorPolicy: "all",
  });

  const res = await deleteFavoriteArticleByArticleId;
  return { data: res.data, error: res.errors };
};
