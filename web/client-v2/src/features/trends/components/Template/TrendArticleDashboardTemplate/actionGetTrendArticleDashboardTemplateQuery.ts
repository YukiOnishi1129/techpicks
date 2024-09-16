"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { TrendArticleDashboardTemplateFragment } from "./TrendArticleDashboardTemplateFragment";

const GetTrendArticleDashboardTemplateQuery = graphql(
  `
    query GetTrendArticleDashboardTemplateQuery(
      $enInput: ArticlesInput!
      $jpInput: ArticlesInput!
    ) {
      ...TrendArticleDashboardTemplateFragment
    }
  `,
  [TrendArticleDashboardTemplateFragment]
);

export const getTrendArticleDashboardTemplateQuery = async (
  enInput: ArticlesInput,
  jpInput: ArticlesInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetTrendArticleDashboardTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      enInput,
      jpInput,
    },
  });

  return { data, error, loading };
};
