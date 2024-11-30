"use server";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { GetArticleListQuery } from "./GetArticleListQuery";

export const getArticleListQuery = async (input: ArticlesInput) => {
  const { data, error, loading } = await getClient().query({
    query: GetArticleListQuery,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      input,
    },
  });

  return { data, error, loading };
};
