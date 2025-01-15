import { graphql } from "gql.tada";

import {
  FavoriteFolderUseManageAllFolderFavoriteArticleFragment,
  UseManageAllFolderFavoriteArticleFragment,
} from "@/features/favorites/hooks/useManageAllFolderFavoriteArticle";

import { AllCopyFavoriteArticleDropdownMenuContentFragment } from "../../DropdownMenu/AllCopyFavoriteArticleDropdownMenu/AllCopyFavoriteArticleDropdownMenuFragment";
import { AllFolderFavoriteArticleCardItemFragment } from "../AllFolderFavoriteArticleCardItem";

export const AllFolderFavoriteArticleCardWrapperFragment = graphql(
  `
    fragment AllFolderFavoriteArticleCardWrapperFragment on FavoriteAllFolderArticleEdge {
      node {
        id
        title
        articleId
        articleUrl
        thumbnailUrl
        platformId
        platformUrl
        platformName
        platformFaviconUrl
        ...UseManageAllFolderFavoriteArticleFragment
      }
      favoriteArticleFolders {
        id
      }
      ...AllFolderFavoriteArticleCardItemFragment
    }
  `,
  [
    AllFolderFavoriteArticleCardItemFragment,
    UseManageAllFolderFavoriteArticleFragment,
  ]
);

export const FavoriteFolderAllFolderArticleCardWrapperFragment = graphql(
  `
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
      ...AllCopyFavoriteArticleDropdownMenuContentFragment
      ...FavoriteFolderUseManageAllFolderFavoriteArticleFragment
    }
  `,
  [
    AllCopyFavoriteArticleDropdownMenuContentFragment,
    FavoriteFolderUseManageAllFolderFavoriteArticleFragment,
  ]
);
