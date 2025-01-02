import { graphql } from "gql.tada";

import { FavoriteArticleFolderLinkFragment } from "../../Sidebar/FavoriteArticleFolderLink/FavoriteArticleFolderLinkFragment";
import { MyFeedFolderLinkFragment } from "../../Sidebar/MyFeedFolderLink/MyFeedFolderLinkFragment";

export const LoggedBaseLayoutQuery = graphql(
  `
    query GetLoggedBaseLayoutQuery(
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
