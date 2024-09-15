"use server";

"use server";

import { graphql, readFragment } from "gql.tada";

import { FavoriteArticleFolderListTemplateFragment } from "@/features/favorites/components/Template/FavoriteArticleFolderListTemplate/FavoriteArticleFolderListTemplateFragment";

import { getClient } from "@/lib/apollo/client";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { LoggedBaseLayoutFragment } from "./LoggedBaseLayoutFragment";

const LoggedBaseLayoutQuery = graphql(
  `
    query LoggedBaseLayoutQuery($input: FavoriteArticleFoldersInput!) {
      ...LoggedBaseLayoutFragment
    }
  `,
  [LoggedBaseLayoutFragment]
);

export const getLoggedBaseLayoutQuery = async (
  input: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: LoggedBaseLayoutQuery,
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
