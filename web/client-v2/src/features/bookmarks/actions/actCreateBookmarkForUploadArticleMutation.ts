"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { CreateBookmarkForUploadArticleInput } from "@/graphql/type";

const CreateBookmarkForUploadArticleMutation = graphql(`
  mutation CreateBookmarkForUploadArticleMutation(
    $input: CreateBookmarkForUploadArticleInput!
  ) {
    createBookmarkForUploadArticle(input: $input) {
      id
    }
  }
`);

export const createBookmarkForUploadArticleMutation = async (
  input: CreateBookmarkForUploadArticleInput
) => {
  const createBookmarkForUploadArticle = getClient().mutate({
    mutation: CreateBookmarkForUploadArticleMutation,
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

  const res = await createBookmarkForUploadArticle;
  return { data: res.data, error: res.errors };
};
