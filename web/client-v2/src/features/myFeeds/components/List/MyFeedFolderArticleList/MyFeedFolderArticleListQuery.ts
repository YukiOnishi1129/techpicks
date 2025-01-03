import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "@/features/articles/components/Card";

export const MyFeedFolderArticleListQuery = graphql(
  `
    query MyFeedFolderArticleListQuery($input: ArticlesInput!) {
      articles(articlesInput: $input) {
        pageInfo {
          hasNextPage
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
