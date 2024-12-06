import { graphql } from "gql.tada";

import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "../../Card";
import { ArticleListFragment } from "../../List";

export const ArticleDashboardTemplateFragment = graphql(
  `
    fragment ArticleDashboardTemplateFragment on Query {
      articles: articles(articlesInput: $input) {
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
        ...ArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [
    ArticleListFragment,
    ArticleCardWrapperFragment,
    FavoriteFolderArticleCardWrapperFragment,
  ]
);
