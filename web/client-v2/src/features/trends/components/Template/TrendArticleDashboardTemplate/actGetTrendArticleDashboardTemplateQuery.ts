"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput, FavoriteArticleFoldersInput } from "@/graphql/type";

import { TrendArticleDashboardTemplateFragment } from "./TrendArticleDashboardTemplateFragment";

const GetTrendArticleDashboardTemplateQuery = graphql(
  `
    query GetTrendArticleDashboardTemplateQuery(
      $enInput: ArticlesInput!
      $jpInput: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      ...TrendArticleDashboardTemplateFragment
    }
  `,
  [TrendArticleDashboardTemplateFragment]
);

export const getTrendArticleDashboardTemplateQuery = async (
  enInput: ArticlesInput,
  jpInput: ArticlesInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetTrendArticleDashboardTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      enInput,
      jpInput,
      favoriteArticleFoldersInput,
    },
  });

  return { data, error, loading };
};
