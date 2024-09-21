import { graphql } from "gql.tada";

import { CopyFavoriteArticleDropdownMenuContentFragment } from "../../DropdownMenu/CopyFavoriteArticleDropdownMenu/CopyFavoriteArticleDropdownMenuFragment";
import { FavoriteArticleCardItemFragment } from "../FavoriteArticleCardItem/FavoriteArticleCardItemFragment";

export const FavoriteArticleCardWrapperFragment = graphql(
  `
    fragment FavoriteArticleCardWrapperFragment on FavoriteArticle {
      id
      articleId
      platformId
      favoriteArticleFolderId
      userId
      title
      description
      thumbnailUrl
      articleUrl
      publishedAt
      authorName
      tags
      platformName
      platformUrl
      platformFaviconUrl
      isEng
      isPrivate
      isRead
      createdAt
      updatedAt
      ...FavoriteArticleCardItemFragment
    }
  `,
  [FavoriteArticleCardItemFragment]
);

export const FavoriteFolderFavoriteArticleCardWrapperFragment = graphql(
  `
    fragment FavoriteFolderFavoriteArticleCardWrapperFragment on FavoriteArticleFolderConnection {
      edges {
        node {
          id
          title
        }
      }
      ...CopyFavoriteArticleDropdownMenuContentFragment
    }
  `,
  [CopyFavoriteArticleDropdownMenuContentFragment]
);
