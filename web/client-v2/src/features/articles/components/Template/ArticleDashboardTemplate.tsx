import { gql } from "@apollo/client";
import { FC } from "react";

import { getClient } from "@/lib/apollo/client";

import { ArticleDashboardTemplateQueryQuery } from "@/graphql/type";

const ArticleDashboardTemplateQuery = gql`
  query ArticleDashboardTemplateQuery($input: ArticlesInput!) {
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

type ArticleDashboardTemplateProps = {
  tab: "site" | "company" | "summary";
};

export const ArticleDashboardTemplate: FC<
  ArticleDashboardTemplateProps
> = async ({ tab }) => {
  const { data, error } =
    await getClient().query<ArticleDashboardTemplateQueryQuery>({
      query: ArticleDashboardTemplateQuery,
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
          tab,
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
