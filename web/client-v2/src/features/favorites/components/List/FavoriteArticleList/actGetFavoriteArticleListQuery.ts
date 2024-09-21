import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticlesInput } from "@/graphql/type";

import { FavoriteArticleListFragment } from "./FavoriteArticleListFragment";

const GetFavoriteArticleListQuery = graphql(
  `
    query GetFavoriteArticleListQuery($input: FavoriteArticlesInput!) {
      favoriteArticles(input: $input) {
        ...FavoriteArticleListFragment
      }
    }
  `,
  [FavoriteArticleListFragment]
);

export const getFavoriteArticleListQuery = async (
  input: FavoriteArticlesInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetFavoriteArticleListQuery,
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

  return { data, error, loading };
};
