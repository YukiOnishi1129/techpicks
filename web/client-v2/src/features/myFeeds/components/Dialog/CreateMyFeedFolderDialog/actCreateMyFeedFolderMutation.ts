"use server";
import { graphql } from "gql.tada";

import { CreateMyFeedFolderInput } from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";


const CreateMyFeedFolderMutation = graphql(`
  mutation CreateMyFeedFolderMutation($input: CreateMyFeedFolderInput!) {
    createMyFeedFolder(createMyFeedFolderInput: $input) {
      id
    }
  }
`);

export const createMyFeedFolderMutation = async (
  input: CreateMyFeedFolderInput
) => {
  const createMyFeedFolder = getClient().mutate({
    mutation: CreateMyFeedFolderMutation,
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

  const res = await createMyFeedFolder;
  return { data: res.data, error: res.errors };
};
