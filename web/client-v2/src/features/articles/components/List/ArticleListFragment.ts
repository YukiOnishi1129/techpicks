import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "../Card";

export const ArticleListFragment = graphql(
  `
    fragment ArticleListFragment on ArticleConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        # cursor
        node {
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
          ...ArticleCardWrapperFragment
        }
      }
    }
  `,
  [ArticleCardWrapperFragment]
);
