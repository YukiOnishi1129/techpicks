"use server";

import { graphql, readFragment } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { BookmarksInput } from "@/graphql/type";

import { BookmarkListFragment } from "../components/List/BookmarkList/BookmarkListFragment";

const BookmarkTemplateFragment = graphql(
  `
    fragment BookmarkTemplateFragment on Query {
      bookmarks(input: $input) {
        ...BookmarkListFragment
      }
    }
  `,
  [BookmarkListFragment]
);

const BookmarkListQuery = graphql(`
  query BookmarkListQuery($input: BookmarksInput!) {
    ...BookmarkTemplateFragment
  }
`);

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
  });

  const newData = readFragment(BookmarkTemplateFragment, data);

  return { data: newData, error, loading };
};
