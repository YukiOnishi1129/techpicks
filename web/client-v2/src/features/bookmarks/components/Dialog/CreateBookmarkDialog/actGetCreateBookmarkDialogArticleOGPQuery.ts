"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/shared/lib/apollo/client";

import { CreateBookmarkDialogContentFragment } from "./CreateBookmarkDialogContentFragment";

const GetCreateBookmarkDialogArticleOGPQuery = graphql(
  `
    query GetCreateBookmarkDialogArticleOGPQuery($url: String!) {
      ...CreateBookmarkDialogContentFragment
    }
  `,
  [CreateBookmarkDialogContentFragment]
);

export const getCreateBookmarkDialogArticleOGPQuery = async (url: string) => {
  const { data, error, loading } = await getClient().query({
    query: GetCreateBookmarkDialogArticleOGPQuery,
    variables: {
      url,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
