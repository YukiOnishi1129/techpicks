import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

import { TrendArticleListFragment } from "../../List";

export const TrendArticleDashboardTemplateFragment = graphql(
  `
    fragment TrendArticleDashboardTemplateFragment on Query {
      articles: articles(articlesInput: $input) {
        ...TrendArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [TrendArticleListFragment, FavoriteFolderArticleCardWrapperFragment]
);
