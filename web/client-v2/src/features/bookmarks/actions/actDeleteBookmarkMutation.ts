"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { DeleteBookmarkInput } from "@/graphql/type";

const DeleteBookmarkMutation = graphql(`
  mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
    deleteBookmark(deleteBookmarkInput: $input)
  }
`);

export const deleteBookmarkMutation = async (input: DeleteBookmarkInput) => {
  const deleteBookmark = getClient().mutate({
    mutation: DeleteBookmarkMutation,
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

  const res = await deleteBookmark;
  return { data: res.data, error: res.errors };
};
