import { graphql } from "gql.tada";

import { ArticleListFragment } from "../../List";

export const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      articles(articlesInput: $input) {
        ...ArticleListFragment
      }
    }
  `,
  [ArticleListFragment]
);
