"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleDashboardTemplateFragment } from "./ArticleDashboardTemplateFragment";

const GetArticleDashboardTemplateQuery = graphql(
  `
    query GetArticleDashboardTemplateQuery(
      $enInput: ArticlesInput!
      $jpInput: ArticlesInput!
    ) {
      ...ArticleDashboardTemplateFragment
    }
  `,
  [ArticleDashboardTemplateFragment]
);

export const getArticleDashboardTemplateQuery = async (
  enInput: ArticlesInput,
  jpInput: ArticlesInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetArticleDashboardTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      enInput,
      jpInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
