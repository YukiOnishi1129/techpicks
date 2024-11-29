"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput, FavoriteArticleFoldersInput } from "@/graphql/type";

import { ArticleDashboardTemplateFragment } from "./ArticleDashboardTemplateFragment";

const GetArticleDashboardTemplateQuery = graphql(
  `
    query GetArticleDashboardTemplateQuery(
      $enInput: ArticlesInput!
      $jpInput: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      ...ArticleDashboardTemplateFragment
    }
  `,
  [ArticleDashboardTemplateFragment]
);

export const getArticleDashboardTemplateQuery = async (
  enInput: ArticlesInput,
  jpInput: ArticlesInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetArticleDashboardTemplateQuery,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
    variables: {
      enInput,
      jpInput,
      favoriteArticleFoldersInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
