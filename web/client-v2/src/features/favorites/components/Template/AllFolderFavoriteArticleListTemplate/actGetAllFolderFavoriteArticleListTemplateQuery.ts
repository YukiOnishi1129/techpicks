"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import {
  FavoriteAllFolderArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";

import { AllFolderFavoriteArticleListTemplateFragment } from "./AllFolderFavoriteArticleListTemplateFragment";

const GetAllFolderFavoriteArticleListTemplateQuery = graphql(
  `
    query GetAllFolderFavoriteArticleListTemplateQuery(
      $favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      ...AllFolderFavoriteArticleListTemplateFragment
    }
  `,
  [AllFolderFavoriteArticleListTemplateFragment]
);

export const getAllFolderFavoriteArticleListTemplateQuery = async (
  favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetAllFolderFavoriteArticleListTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      favoriteAllFolderArticlesInput,
      favoriteArticleFoldersInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
