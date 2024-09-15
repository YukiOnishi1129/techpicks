"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleDashboardTemplateFragment } from "../components/Template/ArticleDashboardTemplate/ArticleDashboardTemplateFragmentFragment";

const ArticleListQuery = graphql(
  `
    query ArticleListQuery($input: ArticlesInput!) {
      ...ArticleDashboardTemplateFragment
    }
  `,
  [ArticleDashboardTemplateFragment]
);

export const getArticleListQuery = async (input: ArticlesInput) => {
  const { data, error, loading } = await getClient().query({
    query: ArticleListQuery,
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

  const newData = readFragment(ArticleDashboardTemplateFragment, data);

  return { data: newData, error, loading };
};
