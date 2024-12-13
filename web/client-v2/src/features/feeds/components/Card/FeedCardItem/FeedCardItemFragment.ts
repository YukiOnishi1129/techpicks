import { graphql } from "gql.tada";

export const FeedCardItemFragment = graphql(`
  fragment FeedCardItemFragment on Feed {
    id
    platform {
      id
      faviconUrl
    }
    name
    description
    siteUrl
    thumbnailUrl
  }
`);
