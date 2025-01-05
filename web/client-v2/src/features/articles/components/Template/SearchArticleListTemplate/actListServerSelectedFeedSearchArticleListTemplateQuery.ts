import { graphql } from "gql.tada";

import { getClient } from "@/lib/apollo/client";

import { SELECTABLE_FEED_LIST_LIMIT } from "@/constant/limit";

export const ListServerSelectedFeedSearchArticleListTemplateQuery = graphql(`
  query ListServerSelectedFeedSearchArticleListTemplateQuery(
    $selectedFeedsInput: FeedsInput!
    $initFeedsInput: FeedsInput!
  ) {
    selectedFeeds: feeds(feedsInput: $selectedFeedsInput) {
      edges {
        node {
          id
          name
        }
      }
    }
    initFeeds: feeds(feedsInput: $initFeedsInput) {
      pageInfo {
        endCursor
      }
    }
  }
`);

export const listServerSelectedFeedSearchArticleListTemplateQuery = async (
  feedIdList: Array<string>
) => {
  const { data, error, loading } = await getClient().query({
    query: ListServerSelectedFeedSearchArticleListTemplateQuery,
    variables: {
      selectedFeedsInput: {
        feedIdList,
        isAllFetch: true,
      },
      initFeedsInput: {
        first: SELECTABLE_FEED_LIST_LIMIT,
        after: null,
      },
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
