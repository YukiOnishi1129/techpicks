import { graphql } from "gql.tada";

export const ShowMyFeedListDialogContentFragment = graphql(`
  fragment ShowMyFeedListDialogContentFragment on Feed {
    id
    name
    description
    thumbnailUrl
    platform {
      faviconUrl
    }
  }
`);
