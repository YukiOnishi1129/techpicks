import { graphql } from "gql.tada";

import { BookmarkCardItemFragment } from "../BookmarkCardItem";

export const BookmarkCardWrapperFragment = graphql(
  `
    fragment BookmarkCardWrapperFragment on Bookmark {
      id
      title
      description
      articleUrl
      thumbnailUrl
      publishedAt
      articleId
      platformId
      platformName
      platformUrl
      platformFaviconUrl
      isEng
      isRead
      createdAt
      updatedAt
      ...BookmarkCardItemFragment
    }
  `,
  [BookmarkCardItemFragment]
);
