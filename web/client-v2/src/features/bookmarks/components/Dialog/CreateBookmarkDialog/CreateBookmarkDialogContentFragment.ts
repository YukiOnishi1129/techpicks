import { graphql } from "gql.tada";

import { OGPPreviewContentFragment } from "@/components/ui/dialog";

export const CreateBookmarkDialogContentFragment = graphql(
  `
    fragment CreateBookmarkDialogContentFragment on Query {
      articleOpg(articleUrl: $url) {
        title
        description
        thumbnailUrl
        articleUrl
        siteUrl
        siteName
        faviconUrl
        ...OGPPreviewContentFragment
      }
    }
  `,
  [OGPPreviewContentFragment]
);
