import { graphql } from "gql.tada";

import { FavoriteFolderAllFolderArticleCardWrapperFragment } from "../../Card";
import { AllFolderFavoriteArticleListFragment } from "../../List";

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
        ...AllFolderFavoriteArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteArticleFoldersAllListTemplateFragment
        ...FavoriteFolderAllFolderArticleCardWrapperFragment
      }
    }
  `,
  [
    AllFolderFavoriteArticleListFragment,
    FavoriteArticleFoldersAllListTemplateFragment,
    FavoriteFolderAllFolderArticleCardWrapperFragment,
  ]
);
