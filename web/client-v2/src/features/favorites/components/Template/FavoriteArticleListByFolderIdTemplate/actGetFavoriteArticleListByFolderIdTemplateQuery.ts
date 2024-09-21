"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticlesInput } from "@/graphql/type";

import { FavoriteArticleListByFolderIdTemplateFragment } from "./FavoriteArticleListByFolderIdTemplateFragment";

const GetFavoriteArticleListByFolderIdTemplateQuery = graphql(
  `
    query GetFavoriteArticleListByFolderIdTemplateQuery(
      $input: FavoriteArticlesInput
    ) {
      ...FavoriteArticleListByFolderIdTemplateFragment
    }
  `,
  [FavoriteArticleListByFolderIdTemplateFragment]
);

export const getFavoriteArticleListByFolderIdTemplateQuery = async (
  input: FavoriteArticlesInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleListByFolderIdTemplateQuery,
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
