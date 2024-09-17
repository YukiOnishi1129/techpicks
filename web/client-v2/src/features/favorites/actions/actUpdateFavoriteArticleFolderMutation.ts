"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { UpdateFavoriteArticleFolderInput } from "@/graphql/type";

const UpdateFavoriteArticleFolderMutation = graphql(`
  mutation UpdateFavoriteArticleFolderMutation(
    $input: UpdateFavoriteArticleFolderInput!
  ) {
    updateFavoriteArticleFolder(input: $input) {
      id
    }
  }
`);

export const updateFavoriteArticleFolderMutation = async (
  input: UpdateFavoriteArticleFolderInput
) => {
  const updateFavoriteArticleFolder = getClient().mutate({
    mutation: UpdateFavoriteArticleFolderMutation,
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

  const res = await updateFavoriteArticleFolder;
  return { data: res.data, error: res.errors };
};
