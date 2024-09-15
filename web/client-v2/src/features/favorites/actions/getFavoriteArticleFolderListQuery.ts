"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { FavoriteArticleFolderListFragment } from "../components/List/FavoriteArticleFolderList";

const FavoriteArticleFolderListTemplateFragment = graphql(
  `
    fragment FavoriteArticleFolderListTemplateFragment on Query {
      favoriteArticleFolders(input: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            title
            description
          }
        }
        ...FavoriteArticleFolderListFragment
      }
    }
  `,
  [FavoriteArticleFolderListFragment]
);

const FavoriteArticleFolderListQuery = graphql(
  `
    query FavoriteArticleFolderListQuery($input: FavoriteArticleFoldersInput!) {
      ...FavoriteArticleFolderListTemplateFragment
    }
  `,
  [FavoriteArticleFolderListTemplateFragment]
);

export const getFavoriteArticleFolderListQuery = async (
  input: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: FavoriteArticleFolderListQuery,
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

  const newData = readFragment(FavoriteArticleFolderListTemplateFragment, data);

  return { data: newData, error, loading };
};
