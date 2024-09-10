"use server";

import { graphql, readFragment } from "gql.tada";

import { CreateBookmarkDialogContentFragment } from "@/features/bookmarks/components/Dialog";

import { getClient } from "@/lib/apollo/client";

const ArticleOGPFragment = graphql(
  `
    fragment ArticleOGPFragment on Query {
      articleOpg(articleUrl: $url) {
        ...CreateBookmarkDialogContentFragment
      }
    }
  `,
  [CreateBookmarkDialogContentFragment]
);

const ArticleOGPQuery = graphql(
  `
    query ArticleOGPQuery($url: String!) {
      ...ArticleOGPFragment
    }
  `,
  [ArticleOGPFragment]
);

export const getArticleOGPQuery = async (url: string) => {
  const { data, error, loading } = await getClient().query({
    query: ArticleOGPQuery,
    variables: {
      url,
    },
  });

  const newData = readFragment(ArticleOGPFragment, data);

  return { data: newData, error, loading };
};
