"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { CreateFavoriteArticleInput } from "@/graphql/type";

const CreateFavoriteArticleMutation = graphql(`
  mutation CreateFavoriteArticleMutation($input: CreateFavoriteArticleInput!) {
    createFavoriteArticle(input: $input) {
      id
      favoriteArticleFolderId
    }
  }
`);

export const createFavoriteArticleMutation = async (
  input: CreateFavoriteArticleInput
) => {
  const createFavoriteArticle = getClient().mutate({
    mutation: CreateFavoriteArticleMutation,
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

  const res = await createFavoriteArticle;
  return { data: res.data, error: res.errors };
};
