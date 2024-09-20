"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { CreateFavoriteArticleFolderInput } from "@/graphql/type";

const CreateFavoriteArticleFolderMutation = graphql(`
  mutation CreateFavoriteArticleFolderMutation(
    $input: CreateFavoriteArticleFolderInput!
  ) {
    createFavoriteArticleFolder(input: $input) {
      id
      title
    }
  }
`);

export const createFavoriteArticleFolderMutation = async (
  input: CreateFavoriteArticleFolderInput
) => {
  const createFavoriteArticleFolder = getClient().mutate({
    mutation: CreateFavoriteArticleFolderMutation,
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

  const res = await createFavoriteArticleFolder;
  return { data: res.data, error: res.errors };
};
