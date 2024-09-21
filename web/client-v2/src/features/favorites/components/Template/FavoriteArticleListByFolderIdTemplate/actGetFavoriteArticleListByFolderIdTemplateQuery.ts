"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import {
  FavoriteArticlesInput,
  FavoriteArticleFoldersInput,
} from "@/graphql/type";

import { FavoriteArticleListByFolderIdTemplateFragment } from "./FavoriteArticleListByFolderIdTemplateFragment";

const GetFavoriteArticleListByFolderIdTemplateQuery = graphql(
  `
    query GetFavoriteArticleListByFolderIdTemplateQuery(
      $favoriteArticlesInput: FavoriteArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      ...FavoriteArticleListByFolderIdTemplateFragment
    }
  `,
  [FavoriteArticleListByFolderIdTemplateFragment]
);

export const getFavoriteArticleListByFolderIdTemplateQuery = async (
  favoriteArticlesInput: FavoriteArticlesInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleListByFolderIdTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      favoriteArticlesInput,
      favoriteArticleFoldersInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
