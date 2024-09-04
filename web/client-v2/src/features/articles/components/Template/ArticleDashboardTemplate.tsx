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
          isBookmarked
          bookmarkId
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
    // Set cache option when executing query, otherwise it will cause an error in the build.
    // TODO: Make it common
    context: {
      fetchOptions: {
        cache: "no-cache",
      },
    },
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

  console.log(data);

  // for (const article of data.articles.edges) {
  //   console.log("🔥");
  //   console.log(article.node.title);
  //   console.log(article.node.isBookmarked);
  // }

  return <div>Article Dashboard</div>;
};
