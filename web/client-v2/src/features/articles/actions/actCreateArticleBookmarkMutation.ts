"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { CreateBookmarkInput } from "@/graphql/type";

const CreateArticleBookmarkMutation = graphql(`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(createBookmarkInput: $input) {
      id
    }
  }
`);

export const createArticleBookmarkMutation = async (
  input: CreateBookmarkInput
) => {
  const createArticleBookmark = getClient().mutate({
    mutation: CreateArticleBookmarkMutation,
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

  const res = await createArticleBookmark;
  return { data: res.data, error: res.errors };
};
