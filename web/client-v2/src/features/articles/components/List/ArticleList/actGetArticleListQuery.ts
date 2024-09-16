"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleListFragment } from "..";

const GetArticleListQuery = graphql(
  `
    query GetArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment]
);

export const getArticleListQuery = async (input: ArticlesInput) => {
  const { data, error, loading } = await getClient().query({
    query: GetArticleListQuery,
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
