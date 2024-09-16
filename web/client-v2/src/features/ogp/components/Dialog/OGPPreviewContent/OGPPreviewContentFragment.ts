import { graphql } from "gql.tada";

export const OGPPreviewContentFragment = graphql(`
  fragment OGPPreviewContentFragment on ArticleOGP {
    title
    description
    thumbnailUrl
    articleUrl
    siteName
    faviconUrl
  }
`);
