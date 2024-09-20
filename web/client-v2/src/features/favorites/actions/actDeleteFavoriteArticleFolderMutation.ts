"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { DeleteFavoriteArticleFolderInput } from "@/graphql/type";

const DeleteFavoriteArticleFolderMutation = graphql(`
  mutation DeleteFavoriteArticleFolderMutation(
    $input: DeleteFavoriteArticleFolderInput!
  ) {
    deleteFavoriteArticleFolder(input: $input)
  }
`);

export const deleteFavoriteArticleFolderMutation = async (
  input: DeleteFavoriteArticleFolderInput
) => {
  const deleteFavoriteArticleFolder = getClient().mutate({
    mutation: DeleteFavoriteArticleFolderMutation,
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

  const res = await deleteFavoriteArticleFolder;
  return { data: res.data, error: res.errors };
};
