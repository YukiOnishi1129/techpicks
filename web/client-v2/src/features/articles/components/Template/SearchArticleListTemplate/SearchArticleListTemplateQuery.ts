import { graphql } from "gql.tada";

import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "../../Card";

export const SearchArticleListTemplateQuery = graphql(
  `
    query SearchArticleListTemplateQuery(
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
