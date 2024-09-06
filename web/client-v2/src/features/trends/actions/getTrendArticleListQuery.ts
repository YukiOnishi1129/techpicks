"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { TrendArticleListFragment } from "../components/List";

const TrendArticleDashboardTemplateFragment = graphql(
  `
    fragment TrendArticleDashboardTemplateFragment on Query {
      articles(articlesInput: $input) {
        ...TrendArticleListFragment
      }
    }
  `,
  [TrendArticleListFragment]
);

const TrendArticleListQuery = graphql(
  `
    query TrendArticleListQuery($input: ArticlesInput!) {
      ...TrendArticleDashboardTemplateFragment
    }
  `,
  [TrendArticleDashboardTemplateFragment]
);

export const getTrendArticleListQuery = async (input: ArticlesInput) => {
  const { data, error, loading } = await getClient().query({
    query: TrendArticleListQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      input,
    },
  });

  const newData = readFragment(TrendArticleDashboardTemplateFragment, data);

  return { data: newData, error, loading };
};
