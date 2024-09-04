import { gql } from "@apollo/client";
import { FC } from "react";

import { getClient } from "@/lib/apollo/client";

import { TrendArticleDashboardTemplateQueryQuery } from "@/graphql/type";

const TrendArticleDashboardTemplateQuery = gql`
  query TrendArticleDashboardTemplateQuery($input: ArticlesInput!) {
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

type TrendArticleDashboardTemplateProps = {};

export const TrendArticleDashboardTemplate: FC<
  TrendArticleDashboardTemplateProps
> = async () => {
  const { data, error } =
    await getClient().query<TrendArticleDashboardTemplateQueryQuery>({
      query: TrendArticleDashboardTemplateQuery,
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
          tab: "trend",
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

  return <div>Trend Article Dashboard</div>;
};
