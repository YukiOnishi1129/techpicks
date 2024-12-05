import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "@/features/articles/components/Card";

import { TrendArticleListFragment } from "./TrendArticleListFragment";

export const GetTrendArticleListQuery = graphql(
  `
    query GetTrendArticleListQuery($input: ArticlesInput!) {
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
        ...TrendArticleListFragment
      }
    }
  `,
  [TrendArticleListFragment, ArticleCardWrapperFragment]
);
