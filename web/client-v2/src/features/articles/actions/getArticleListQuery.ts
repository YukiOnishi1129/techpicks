"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { ArticleListQueryQuery, ArticlesInput } from "@/graphql/type";

import { ArticleListFragment } from "../components/List/ArticleListFragment";
// import { ArticleDashboardTemplateFragment } from "../components/Template";

const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      articles(articlesInput: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
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
  const { data, error, loading } =
    await getClient().query<ArticleListQueryQuery>({
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

  return { data, error, loading };
};
