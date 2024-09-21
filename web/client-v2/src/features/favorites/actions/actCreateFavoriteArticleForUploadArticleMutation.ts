"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { CreateFavoriteArticleForUploadArticleInput } from "@/graphql/type";

const CreateFavoriteArticleForUploadArticleMutation = graphql(`
  mutation CreateFavoriteArticleForUploadArticleMutation(
    $input: CreateFavoriteArticleForUploadArticleInput!
  ) {
    createFavoriteArticleForUploadArticle(input: $input) {
      id
    }
  }
`);

export const createFavoriteArticleForUploadArticleMutation = async (
  input: CreateFavoriteArticleForUploadArticleInput
) => {
  const createFavoriteArticleForUploadArticle = getClient().mutate({
    mutation: CreateFavoriteArticleForUploadArticleMutation,
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

  const res = await createFavoriteArticleForUploadArticle;
  return { data: res.data, error: res.errors };
};
