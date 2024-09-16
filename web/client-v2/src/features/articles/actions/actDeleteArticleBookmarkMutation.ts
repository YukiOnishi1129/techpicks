"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { DeleteBookmarkInput } from "@/graphql/type";

const DeleteArticleBookmarkMutation = graphql(`
  mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
    deleteBookmark(deleteBookmarkInput: $input)
  }
`);

export const deleteArticleBookmarkMutation = async (
  input: DeleteBookmarkInput
) => {
  const deleteArticleBookmark = getClient().mutate({
    mutation: DeleteArticleBookmarkMutation,
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

  const res = await deleteArticleBookmark;
  return { data: res.data, error: res.errors };
};
