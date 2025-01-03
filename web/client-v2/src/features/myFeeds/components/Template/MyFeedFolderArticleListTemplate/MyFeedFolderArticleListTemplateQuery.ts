import { graphql } from "gql.tada";

import { ArticleCardWrapperFragment } from "@/features/articles/components/Card";

export const MyFeedFolderArticleListTemplateQuery = graphql(
  `
    query MyFeedFolderArticleListTemplateQuery($input: ArticlesInput!) {
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
