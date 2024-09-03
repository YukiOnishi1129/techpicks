import { gql } from "@apollo/client";
import { FC } from "react";

const GET_ARTICLES = gql`
  query GetArticles($input: ArticlesInput!) {
    articles(articlesInput: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

type ArticleDashboardTemplateProps = {};

export const ArticleDashboardTemplate: FC<
  ArticleDashboardTemplateProps
> = () => {
  return <div>Article Dashboard</div>;
};
