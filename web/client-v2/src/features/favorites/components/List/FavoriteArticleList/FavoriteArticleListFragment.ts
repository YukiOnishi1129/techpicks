import { graphql } from "gql.tada";

import { FavoriteArticleCardWrapperFragment } from "../../Card/FavoriteArticleCardWrapper/FavoriteArticleCardWrapperFragment";

export const FavoriteArticleListFragment = graphql(
  `
    fragment FavoriteArticleListFragment on FavoriteArticleConnection {
      edges {
        node {
          id
          ...FavoriteArticleCardWrapperFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `,
  [FavoriteArticleCardWrapperFragment]
);
