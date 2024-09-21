"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import {
  FavoriteAllFolderArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";

import { FavoriteArticleAllListTemplateFragment } from "./FavoriteArticleAllListTemplateFragment";

const GetFavoriteArticleFoldersAllListTemplateQuery = graphql(
  `
    query GetFavoriteArticleFoldersAllListTemplateQuery(
      $favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      ...FavoriteArticleAllListTemplateFragment
    }
  `,
  [FavoriteArticleAllListTemplateFragment]
);

export const getFavoriteArticleFoldersAllListTemplateQuery = async (
  favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleFoldersAllListTemplateQuery,
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
