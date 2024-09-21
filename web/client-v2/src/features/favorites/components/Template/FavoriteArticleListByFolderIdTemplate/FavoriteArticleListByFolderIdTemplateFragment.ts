import { graphql } from "gql.tada";

import { FavoriteArticleListFragment } from "../../List/FavoriteArticleList/FavoriteArticleListFragment";

export const FavoriteArticleListByFolderIdTemplateFragment = graphql(
  `
    fragment FavoriteArticleListByFolderIdTemplateFragment on Query {
      favoriteArticles(input: $favoriteArticlesInput) {
        ...FavoriteArticleListFragment
      }
      favoriteArticleFolder(input: $folderInput) {
        id
        title
      }
    }
  `,
  [FavoriteArticleListFragment]
);
