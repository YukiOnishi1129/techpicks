import { graphql } from "gql.tada";

import { OGPPreviewContentFragment } from "@/features/ogp/components/Dialog";

export const OGPCreateMultiFolderFavoriteArticleDialogFragment = graphql(
  `
    fragment OGPCreateMultiFolderFavoriteArticleDialogFragment on Query {
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
