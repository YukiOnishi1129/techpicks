"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { BookmarksInput } from "@/graphql/type";

import { BookmarkListFragment } from "./BookmarkListFragment";

const GetBookmarkListQuery = graphql(
  `
    query GetBookmarkListQuery($input: BookmarksInput!) {
      bookmarks(input: $input) {
        ...BookmarkListFragment
      }
    }
  `,
  [BookmarkListFragment]
);

export const getBookmarkListQuery = async (input: BookmarksInput) => {
  const { data, error, loading } = await getClient().query({
    query: GetBookmarkListQuery,
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
