import { graphql } from "gql.tada";

export const FeedAccordionFragment = graphql(`
  fragment FeedAccordionFragment on MyFeedFolder {
    id
    feeds {
      id
      name
      platform {
        faviconUrl
      }
    }
  }
`);
