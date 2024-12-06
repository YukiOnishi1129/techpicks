import { graphql } from "gql.tada";

import { ArticleListFragment } from "./ArticleListFragment";
import { ArticleCardWrapperFragment } from "../../Card";

export const GetArticleListQuery = graphql(
  `
    query GetArticleListQuery($input: ArticlesInput!) {
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
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment, ArticleCardWrapperFragment]
);
