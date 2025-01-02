import { graphql } from "gql.tada";

import { FeedAccordionFragment } from "../FeedAccordion/FeedAccordionFragment";

export const MyFeedFolderLinkFragment = graphql(
  `
    fragment MyFeedFolderLinkFragment on MyFeedFolder {
      id
      title
      ...FeedAccordionFragment
    }
  `,
  [FeedAccordionFragment]
);
