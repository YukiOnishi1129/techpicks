"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { TrendArticleListFragment } from "..";

const TrendArticleListQuery = graphql(
  `
    query TrendArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        ...TrendArticleListFragment
      }
    }
  `,
  [TrendArticleListFragment]
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

  const newData = readFragment(TrendArticleListFragment, data.articles);

  return { newData, error, loading };
};
