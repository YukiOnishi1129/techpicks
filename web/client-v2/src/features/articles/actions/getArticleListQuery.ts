"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticlesInput } from "@/graphql/type";

import { ArticleListFragment } from "../components/List/ArticleList/fragment";
// import { ArticleDashboardTemplateFragment } from "../components/Template";

const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      articles(articlesInput: $input) {
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment]
);

const ArticleListQuery = graphql(
  `
    query ArticleListQuery($input: ArticlesInput!) {
      ...ArticleDashboardTemplateFragment
    }
  `,
  [ArticleDashboardTemplateFragment, ArticleListFragment]
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

  const newData = readFragment(ArticleDashboardTemplateFragment, data);

  return { data: newData, error, loading };
};
