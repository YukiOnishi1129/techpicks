import { graphql } from "gql.tada";

import { SELECTABLE_FEED_LIST_LIMIT } from "@/shared/constant/limit";
import { getClient } from "@/shared/lib/apollo/client";

export const ListServerFeedSearchArticleListFormTemplateQuery = graphql(`
  query ListServerFeedSearchArticleListFormTemplateQuery(
    $initFeedsInput: FeedsInput!
  ) {
    initFeeds: feeds(feedsInput: $initFeedsInput) {
      pageInfo {
        endCursor
      }
    }
  }
`);

export const listServerFeedSearchArticleListFormTemplateQuery = async () => {
  const { data, error, loading } = await getClient().query({
    query: ListServerFeedSearchArticleListFormTemplateQuery,
    variables: {
      initFeedsInput: {
        first: SELECTABLE_FEED_LIST_LIMIT,
        after: null,
      },
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
