import { graphql } from "gql.tada";

import { ArticleListFragment } from "../../List";

export const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      enArticles: articles(articlesInput: $enInput) {
        ...ArticleListFragment
      }
      jpArticles: articles(articlesInput: $jpInput) {
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment]
);
