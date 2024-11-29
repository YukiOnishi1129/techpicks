import { graphql } from "gql.tada";

export const AllFolderFavoriteArticleCardItemFragment = graphql(`
  fragment AllFolderFavoriteArticleCardItemFragment on FavoriteAllFolderArticleEdge {
    node {
      id
      articleId
      platformId
      favoriteArticleFolderId
      title
      thumbnailUrl
      articleUrl
      platformName
      platformUrl
      platformFaviconUrl
      isEng
      createdAt
    }
    favoriteArticleFolders {
      id
      title
    }
  }
`);
