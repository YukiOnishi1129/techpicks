"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { BookmarksInput } from "@/graphql/type";

import { BookmarkTemplateFragment } from "./BookmarkTemplateFragment";

const GetBookmarkTemplateQuery = graphql(
  `
    query GetBookmarkTemplateQuery($input: BookmarksInput!) {
      ...BookmarkTemplateFragment
    }
  `,
  [BookmarkTemplateFragment]
);

export const getBookmarkTemplateQuery = async (input: BookmarksInput) => {
  const { data, error, loading } = await getClient().query({
    query: GetBookmarkTemplateQuery,
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
