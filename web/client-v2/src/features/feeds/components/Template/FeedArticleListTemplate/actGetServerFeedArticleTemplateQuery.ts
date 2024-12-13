"use server";

import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

const GetServerFeedArticleTemplateQuery = graphql(`
  query GetServerFeedArticleTemplateQuery($input: FeedInput!) {
    feed(feedInput: $input) {
      id
      name
    }
  }
`);

export const getServerFeedArticleTemplateQuery = async (id: string) => {
  const { data, error, loading } = await getClient().query({
    query: GetServerFeedArticleTemplateQuery,
    variables: {
      input: {
        id,
      },
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
