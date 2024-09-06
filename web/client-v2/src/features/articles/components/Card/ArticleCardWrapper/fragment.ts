import { graphql } from "gql.tada";

import { ArticleCardItemFragment } from "../ArticleCardItem";

export const ArticleCardWrapperFragment = graphql(
  `
    fragment ArticleCardWrapperFragment on Article {
      id
      platform {
        id
        name
        faviconUrl
      }
      title
      articleUrl
      publishedAt
      thumbnailUrl
      isEng
      isPrivate
      isBookmarked
      bookmarkId
      likeCount
      ...ArticleCardItemFragment
    }
  `,
  [ArticleCardItemFragment]
);
