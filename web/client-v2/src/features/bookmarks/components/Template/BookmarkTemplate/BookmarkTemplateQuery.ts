import { graphql } from "gql.tada";

import {
  BookmarkCardWrapperFragment,
  FavoriteFolderBookmarkCardWrapperFragment,
} from "../../Card";

export const BookmarkTemplateQuery = graphql(
  `
    query BookmarkTemplateQuery(
      $input: BookmarksInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
      bookmarks(input: $input) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            ...BookmarkCardWrapperFragment
          }
        }
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderBookmarkCardWrapperFragment
      }
    }
  `,
  [BookmarkCardWrapperFragment, FavoriteFolderBookmarkCardWrapperFragment]
);
