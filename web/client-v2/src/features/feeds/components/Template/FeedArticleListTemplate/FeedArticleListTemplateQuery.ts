import { graphql } from "gql.tada";

import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "@/features/articles/components/Card";

export const FeedArticleListTemplateQuery = graphql(
  `
    query FeedArticleListTemplateQuery(
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
