import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

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
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [TrendArticleListFragment, FavoriteFolderArticleCardWrapperFragment]
);
