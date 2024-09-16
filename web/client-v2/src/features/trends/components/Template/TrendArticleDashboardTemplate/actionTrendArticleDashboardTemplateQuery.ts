"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { TrendArticleDashboardTemplateFragment } from "./TrendArticleDashboardTemplateFragment";

const TrendArticleDashboardTemplateQuery = graphql(
  `
    query TrendArticleDashboardTemplateQuery(
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
    query: TrendArticleDashboardTemplateQuery,
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

  const newData = readFragment(TrendArticleDashboardTemplateFragment, data);

  return { newData, error, loading };
};
