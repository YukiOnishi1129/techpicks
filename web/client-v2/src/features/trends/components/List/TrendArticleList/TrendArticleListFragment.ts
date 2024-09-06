import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "@/features/articles/components/Card";

export const TrendArticleListFragment = graphql(
  `
    fragment TrendArticleListFragment on ArticleConnection {
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
