import { gql } from "@apollo/client";
import { FC } from "react";

import { getClient } from "@/lib/apollo/client";

import { GetArticlesQuery } from "@/graphql/type";

const GET_ARTICLES_QUERY = gql`
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
> = async () => {
  const { data, error } = await getClient().query<GetArticlesQuery>({
    query: GET_ARTICLES_QUERY,
    variables: {
      input: {
        first: 20,
        after: null,
      },
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>Article Dashboard</div>;
};
