import { graphql } from "gql.tada";

import { OGPPreviewContentFragment } from "@/features/ogp/components/Dialog";

export const CreateFavoriteArticleDialogContentFragment = graphql(
  `
    fragment CreateFavoriteArticleDialogContentFragment on Query {
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
