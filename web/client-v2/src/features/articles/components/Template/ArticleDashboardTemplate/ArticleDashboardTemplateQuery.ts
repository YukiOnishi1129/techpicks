import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "../../Card";

export const ArticleDashboardTemplateQuery = graphql(
  `
    query ArticleDashboardTemplateQuery(
      $input: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [FavoriteFolderArticleCardWrapperFragment]
);
