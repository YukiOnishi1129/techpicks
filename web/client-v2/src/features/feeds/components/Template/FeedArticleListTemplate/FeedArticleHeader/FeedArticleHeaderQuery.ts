import { graphql } from "gql.tada";

export const FeedArticleHeaderQuery = graphql(`
  query FeedArticleHeaderQuery($input: FeedInput!) {
    feed(feedInput: $input) {
      id
      name
      platform {
        faviconUrl
      }
    }
  }
`);
