import { graphql } from "gql.tada";

import {
  FavoriteArticleCardWrapperFragment,
  FavoriteFolderFavoriteArticleCardWrapperFragment,
} from "../../Card";

export const FavoriteArticleListByFolderIdTemplateQuery = graphql(
  `
    query FavoriteArticleListByFolderIdTemplateQuery(
      $input: FavoriteArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      favoriteArticles(input: $input) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            ...FavoriteArticleCardWrapperFragment
          }
        }
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderFavoriteArticleCardWrapperFragment
      }
    }
  `,
  [
    FavoriteArticleCardWrapperFragment,
    FavoriteFolderFavoriteArticleCardWrapperFragment,
  ]
);
