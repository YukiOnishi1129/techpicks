"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { FavoriteArticleFolderListFragment } from "./FavoriteArticleFolderListFragment";

const GetFavoriteArticleFolderListQuery = graphql(
  `
    query GetFavoriteArticleFolderListQuery(
      $input: FavoriteArticleFoldersInput!
    ) {
      favoriteArticleFolders(input: $input) {
        ...FavoriteArticleFolderListFragment
      }
    }
  `,
  [FavoriteArticleFolderListFragment]
);

export const getFavoriteArticleFolderListQuery = async (
  input: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleFolderListQuery,
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

  return { data, error, loading };
};
