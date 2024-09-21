import { graphql } from "gql.tada";

import { FavoriteFolderFavoriteArticleCardWrapperFragment } from "../../Card/FavoriteArticleCardWrapper/FavoriteArticleCardWrapperFragment";
import { FavoriteArticleListFragment } from "../../List/FavoriteArticleList/FavoriteArticleListFragment";

export const FavoriteArticleFoldersByFolderIdTemplateFragment = graphql(`
  fragment FavoriteArticleFoldersByFolderIdTemplateFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
  }
`);

export const FavoriteArticleListByFolderIdTemplateFragment = graphql(
  `
    fragment FavoriteArticleListByFolderIdTemplateFragment on Query {
      favoriteArticles(input: $favoriteArticlesInput) {
        ...FavoriteArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteArticleFoldersByFolderIdTemplateFragment
        ...FavoriteFolderFavoriteArticleCardWrapperFragment
      }
    }
  `,
  [
    FavoriteArticleListFragment,
    FavoriteArticleFoldersByFolderIdTemplateFragment,
    FavoriteFolderFavoriteArticleCardWrapperFragment,
  ]
);
