"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import {
  FavoriteArticleFolderInput,
  FavoriteArticlesInput,
} from "@/graphql/type";

import { FavoriteArticleListByFolderIdTemplateFragment } from "./FavoriteArticleListByFolderIdTemplateFragment";

const GetFavoriteArticleListByFolderIdTemplateQuery = graphql(
  `
    query GetFavoriteArticleListByFolderIdTemplateQuery(
      $favoriteArticlesInput: FavoriteArticlesInput!
      $folderInput: FavoriteArticleFolderInput!
    ) {
      ...FavoriteArticleListByFolderIdTemplateFragment
    }
  `,
  [FavoriteArticleListByFolderIdTemplateFragment]
);

export const getFavoriteArticleListByFolderIdTemplateQuery = async (
  favoriteArticlesInput: FavoriteArticlesInput,
  folderInput: FavoriteArticleFolderInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleListByFolderIdTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      favoriteArticlesInput,
      folderInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
