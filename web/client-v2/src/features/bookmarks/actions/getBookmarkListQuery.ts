"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { BookmarksInput } from "@/graphql/type";

import { BookmarkTemplateFragment } from "../components/Template/BookmarkTemplate/BookmarkTemplateFragment";

const BookmarkListQuery = graphql(
  `
    query BookmarkListQuery($input: BookmarksInput!) {
      ...BookmarkTemplateFragment
    }
  `,
  [BookmarkTemplateFragment]
);

export const getBookmarkListQuery = async (input: BookmarksInput) => {
  const { data, error, loading } = await getClient().query({
    query: BookmarkListQuery,
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

  const newData = readFragment(BookmarkTemplateFragment, data);

  return { data: newData, error, loading };
};
