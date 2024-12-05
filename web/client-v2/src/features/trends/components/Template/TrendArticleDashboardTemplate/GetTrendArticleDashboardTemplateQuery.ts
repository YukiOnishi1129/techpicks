import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

import { TrendArticleDashboardTemplateFragment } from "./TrendArticleDashboardTemplateFragment";

export const GetTrendArticleDashboardTemplateQuery = graphql(
  `
    query GetTrendArticleDashboardTemplateQuery(
      $input: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
      ...TrendArticleDashboardTemplateFragment
    }
  `,
  [
    TrendArticleDashboardTemplateFragment,
    FavoriteFolderArticleCardWrapperFragment,
  ]
);
