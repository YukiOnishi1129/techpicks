import { graphql } from "gql.tada";

import { ArticleDashboardTemplateFragment } from "./ArticleDashboardTemplateFragment";
import { FavoriteFolderArticleCardWrapperFragment } from "../../Card";

export const GetArticleDashboardTemplateQuery = graphql(
  `
    query GetArticleDashboardTemplateQuery(
      $input: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
      ...ArticleDashboardTemplateFragment
    }
  `,
  [ArticleDashboardTemplateFragment, FavoriteFolderArticleCardWrapperFragment]
);
