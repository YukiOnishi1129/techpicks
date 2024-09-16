"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleDashboardTemplateFragment } from "./ArticleDashboardTemplateFragment";

const ArticleDashboardTemplateQuery = graphql(
  `
    query ArticleDashboardTemplateQuery(
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
    query: ArticleDashboardTemplateQuery,
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

  const newData = readFragment(ArticleDashboardTemplateFragment, data);

  return { data: newData, error, loading };
};
