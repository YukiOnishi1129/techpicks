import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "../../Card";

export const ArticleListQuery = graphql(
  `
    query ArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            ...ArticleCardWrapperFragment
          }
        }
      }
    }
  `,
  [ArticleCardWrapperFragment]
);
