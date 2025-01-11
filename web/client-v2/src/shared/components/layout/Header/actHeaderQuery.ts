"use server";

import { graphql } from "gql.tada";

import { FavoriteArticleFoldersInput } from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";

const actFetchHeaderQuery = graphql(`
  query actHeaderQuery($input: FavoriteArticleFoldersInput) {
    favoriteArticleFolders(input: $input) {
      pageInfo {
        endCursor
      }
    }
  }
`);

export const fetchHeaderQuery = async (input: FavoriteArticleFoldersInput) => {
  const { data, error, loading } = await getClient().query({
    query: actFetchHeaderQuery,
    variables: { input },
    errorPolicy: "all",
  });
  return { data, error, loading };
};
