import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "../../Card";

export const SearchArticleListQuery = graphql(
  `
    query SearchArticleListQuery($input: ArticlesInput!) {
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
