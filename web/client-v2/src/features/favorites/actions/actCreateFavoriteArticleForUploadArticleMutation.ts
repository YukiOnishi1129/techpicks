"use server";

import { graphql } from "gql.tada";

import { CreateFavoriteArticleForUploadArticleInput } from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";


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
