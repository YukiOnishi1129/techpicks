"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { FavoriteArticleFolderListTemplateFragment } from "./FavoriteArticleFolderListTemplateFragment";

const GetFavoriteArticleFolderListTemplateQuery = graphql(
  `
    query GetFavoriteArticleFolderListTemplateQuery(
      $input: FavoriteArticleFoldersInput!
    ) {
      ...FavoriteArticleFolderListTemplateFragment
    }
  `,
  [FavoriteArticleFolderListTemplateFragment]
);

export const getFavoriteArticleFolderListTemplateQuery = async (
  input: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleFolderListTemplateQuery,
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

  return { data, error, loading };
};
