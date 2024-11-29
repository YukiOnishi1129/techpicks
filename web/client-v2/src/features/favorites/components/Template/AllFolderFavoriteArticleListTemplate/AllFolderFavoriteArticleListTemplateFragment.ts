import { graphql } from "gql.tada";

import { FavoriteFolderAllFolderArticleCardWrapperFragment } from "../../Card";
import { AllFolderFavoriteArticleListFragment } from "../../List";

export const AllFolderFavoriteArticleListTemplateFragment = graphql(
  `
    fragment AllFolderFavoriteArticleListTemplateFragment on Query {
      favoriteAllFolderArticles(input: $favoriteAllFolderArticlesInput) {
        ...AllFolderFavoriteArticleListFragment
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderAllFolderArticleCardWrapperFragment
      }
    }
  `,
  [
    AllFolderFavoriteArticleListFragment,
    FavoriteFolderAllFolderArticleCardWrapperFragment,
  ]
);
