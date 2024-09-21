import { graphql } from "gql.tada";

export const FavoriteArticleListByFolderIdTemplateFragment = graphql(`
  fragment FavoriteArticleListByFolderIdTemplateFragment on Query {
    favoriteArticles(input: $favoriteArticlesInput) {
      edges {
        node {
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    favoriteArticleFolder(input: $folderInput) {
      id
      title
    }
  }
`);
