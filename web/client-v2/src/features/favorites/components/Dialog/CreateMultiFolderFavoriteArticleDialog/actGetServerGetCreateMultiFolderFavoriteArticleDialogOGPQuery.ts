"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/shared/lib/apollo/client";

import { OGPCreateMultiFolderFavoriteArticleDialogFragment } from "./OGPCreateMultiFolderFavoriteArticleDialogFragment";

const GetServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery = graphql(
  `
    query GetServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery(
      $url: String!
    ) {
      ...OGPCreateMultiFolderFavoriteArticleDialogFragment
    }
  `,
  [OGPCreateMultiFolderFavoriteArticleDialogFragment]
);

export const getServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery =
  async (url: string) => {
    const { data, error, loading } = await getClient().query({
      query: GetServerGetCreateMultiFolderFavoriteArticleDialogOGPQuery,
      variables: {
        url,
      },
      errorPolicy: "all",
    });

    return { data, error, loading };
  };
