"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { TrendArticleListFragment } from "..";

const GetTrendArticleListQuery = graphql(
  `
    query GetTrendArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        ...TrendArticleListFragment
      }
    }
  `,
  [TrendArticleListFragment]
);

export const getTrendArticleListQuery = async (input: ArticlesInput) => {
  const { data, error, loading } = await getClient().query({
    query: GetTrendArticleListQuery,
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
    variables: {
      input,
    },
  });

  return { data, error, loading };
};
