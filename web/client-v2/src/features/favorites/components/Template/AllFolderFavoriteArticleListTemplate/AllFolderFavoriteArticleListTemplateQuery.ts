import { graphql } from "gql.tada";

import {
  AllFolderFavoriteArticleCardWrapperFragment,
  FavoriteFolderAllFolderArticleCardWrapperFragment,
} from "../../Card";

export const AllFolderFavoriteArticleListTemplateQuery = graphql(
  `
    query AllFolderFavoriteArticleListTemplateQuery(
      $favoriteAllFolderArticlesInput: FavoriteAllFolderArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      favoriteAllFolderArticles(input: $favoriteAllFolderArticlesInput) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
          }
          ...AllFolderFavoriteArticleCardWrapperFragment
        }
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderAllFolderArticleCardWrapperFragment
      }
    }
  `,
  [
    AllFolderFavoriteArticleCardWrapperFragment,
    FavoriteFolderAllFolderArticleCardWrapperFragment,
  ]
);
