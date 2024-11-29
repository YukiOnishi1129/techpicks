"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteAllFolderArticlesInput } from "@/graphql/type";

import { AllFolderFavoriteArticleListFragment } from "./AllFolderFavoriteArticleListFragment";

const GetAllFolderFavoriteArticleListQuery = graphql(
  `
    query GetAllFolderFavoriteArticleListQuery(
      $input: FavoriteAllFolderArticlesInput!
    ) {
      favoriteAllFolderArticles(input: $input) {
        ...AllFolderFavoriteArticleListFragment
      }
    }
  `,
  [AllFolderFavoriteArticleListFragment]
);

export const getAllFolderFavoriteArticleListQuery = async (
  input: FavoriteAllFolderArticlesInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetAllFolderFavoriteArticleListQuery,
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
