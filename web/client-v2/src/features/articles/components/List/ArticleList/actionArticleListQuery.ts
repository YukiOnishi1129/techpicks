"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleListFragment } from "..";

const ArticleListQuery = graphql(
  `
    query ArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment]
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
  });

  const newData = readFragment(ArticleListFragment, data.articles);

  return { newData, error, loading };
};
