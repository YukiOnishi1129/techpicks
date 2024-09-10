import { graphql } from "gql.tada";

import { OGPPreviewContentFragment } from "@/components/ui/dialog";

export const CreateBookmarkDialogContentFragment = graphql(
  `
    fragment CreateBookmarkDialogContentFragment on ArticleOGP {
      ...OGPPreviewContentFragment
    }
  `,
  [OGPPreviewContentFragment]
);
