import { graphql } from "gql.tada";

import { FavoriteArticleCardWrapperFragment } from "../../Card";

export const FavoriteArticleListQuery = graphql(
  `
    query FavoriteArticleListQuery($input: FavoriteArticlesInput!) {
      favoriteArticles(input: $input) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            ...FavoriteArticleCardWrapperFragment
          }
        }
      }
    }
  `,
  [FavoriteArticleCardWrapperFragment]
);
