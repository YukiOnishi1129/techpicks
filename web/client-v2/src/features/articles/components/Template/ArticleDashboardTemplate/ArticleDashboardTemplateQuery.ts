import { graphql } from "gql.tada";

import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "../../Card";

export const ArticleDashboardTemplateQuery = graphql(
  `
    query ArticleDashboardTemplateQuery(
      $input: ArticlesInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      articles(articlesInput: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            ...ArticleCardWrapperFragment
          }
        }
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [ArticleCardWrapperFragment, FavoriteFolderArticleCardWrapperFragment]
);
