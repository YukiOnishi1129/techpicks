import { graphql } from "gql.tada";

import { FavoriteFolderFavoriteArticleCardWrapperFragment } from "../../Card/FavoriteArticleCardWrapper/FavoriteArticleCardWrapperFragment";
import { FavoriteArticleAllListFragment } from "../../List/FavoriteArticleAllList/FavoriteArticleAllListFragment";

export const FavoriteArticleFoldersAllListTemplateFragment = graphql(`
  fragment FavoriteArticleFoldersAllListTemplateFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
      }
    }
  }
`);

export const FavoriteArticleAllListTemplateFragment = graphql(
  `
    fragment FavoriteArticleAllListTemplateFragment on Query {
      favoriteAllFolderArticles(input: $favoriteAllFolderArticlesInput) {
        ...FavoriteArticleAllListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteArticleFoldersAllListTemplateFragment
        ...FavoriteFolderFavoriteArticleCardWrapperFragment
      }
    }
  `,
  [
    FavoriteArticleAllListFragment,
    FavoriteArticleFoldersAllListTemplateFragment,
    FavoriteFolderFavoriteArticleCardWrapperFragment,
  ]
);
