import { graphql } from "gql.tada";

import { BookmarkListFragment } from "../../List";

export const BookmarkTemplateFragment = graphql(
  `
    fragment BookmarkTemplateFragment on Query {
      bookmarks(input: $input) {
        ...BookmarkListFragment
      }
    }
  `,
  [BookmarkListFragment]
);
