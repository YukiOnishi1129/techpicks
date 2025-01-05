"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/shared/lib/apollo/client";

import { CreateFavoriteArticleDialogContentFragment } from "./CreateFavoriteArticleDialogFragment";

const GetCreateFavoriteArticleDialogOGPQuery = graphql(
  `
    query GetCreateFavoriteArticleDialogOGPQuery($url: String!) {
      ...CreateFavoriteArticleDialogContentFragment
    }
  `,
  [CreateFavoriteArticleDialogContentFragment]
);

export const getCreateFavoriteArticleDialogOGPQuery = async (url: string) => {
  const { data, error, loading } = await getClient().query({
    query: GetCreateFavoriteArticleDialogOGPQuery,
    variables: {
      url,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
