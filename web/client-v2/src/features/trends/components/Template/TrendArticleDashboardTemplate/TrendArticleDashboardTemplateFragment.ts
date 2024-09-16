import { graphql } from "gql.tada";

import { TrendArticleListFragment } from "../../List";

export const TrendArticleDashboardTemplateFragment = graphql(
  `
    fragment TrendArticleDashboardTemplateFragment on Query {
      enArticles: articles(articlesInput: $enInput) {
        ...TrendArticleListFragment
      }
      jpArticles: articles(articlesInput: $jpInput) {
        ...TrendArticleListFragment
      }
    }
  `,
  [TrendArticleListFragment]
);
