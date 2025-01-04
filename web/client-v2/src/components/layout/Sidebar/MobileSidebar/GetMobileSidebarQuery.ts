import { graphql } from "gql.tada";

import { FavoriteArticleFolderLinkFragment } from "../FavoriteArticleFolderLink/FavoriteArticleFolderLinkFragment";
import { MyFeedFolderLinkFragment } from "../MyFeedFolderLink/MyFeedFolderLinkFragment";

export const GetMobileSidebarQuery = graphql(
  `
    query GetMobileSidebarQuery(
      $input: FavoriteArticleFoldersInput!
      $myFeedFoldersInput: MyFeedFoldersInput!
    ) {
      favoriteArticleFolders(input: $input) {
        edges {
          node {
            ...FavoriteArticleFolderLinkFragment
          }
        }
      }
      myFeedFolders(myFeedFoldersInput: $myFeedFoldersInput) {
        edges {
          node {
            id
            ...MyFeedFolderLinkFragment
          }
        }
      }
    }
  `,
  [FavoriteArticleFolderLinkFragment, MyFeedFolderLinkFragment]
);
