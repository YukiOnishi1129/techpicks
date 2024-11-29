import { graphql } from "gql.tada";

import { AllFolderFavoriteArticleCardItemFragment } from "../AllFolderFavoriteArticleCardItem";

export const AllFolderFavoriteArticleCardWrapperFragment = graphql(
  `
    fragment AllFolderFavoriteArticleCardWrapperFragment on FavoriteAllFolderArticleEdge {
      ...AllFolderFavoriteArticleCardItemFragment
    }
  `,
  [AllFolderFavoriteArticleCardItemFragment]
);

export const FavoriteFolderAllFolderArticleCardWrapperFragment = graphql(`
  fragment FavoriteFolderAllFolderArticleCardWrapperFragment on FavoriteArticleFolderConnection {
    edges {
      node {
        id
        title
        favoriteArticles {
          id
          articleId
        }
      }
    }
  }
`);
