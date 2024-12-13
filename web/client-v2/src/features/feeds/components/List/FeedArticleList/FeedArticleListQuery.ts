import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "@/features/articles/components/Card";

export const FeedArticleListQuery = graphql(
  `
    query FeedArticleListQuery($input: ArticlesInput!) {
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
