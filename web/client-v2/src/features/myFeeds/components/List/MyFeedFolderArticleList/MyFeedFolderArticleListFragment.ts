import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

export const MyFeedFolderArticleListFragment = graphql(
  `
    fragment MyFeedFolderArticleListFragment on Query {
      myFeedFolder(myFeedFolderInput: $myFeedFolderInput) {
        id
        title
        feeds {
          id
        }
      }
      feeds(feedsInput: $feedsInput) {
        edges {
          node {
            id
            name
          }
        }
      }
      favoriteArticleFolders(input: $favoriteArticleFoldersInput) {
        ...FavoriteFolderArticleCardWrapperFragment
      }
    }
  `,
  [FavoriteFolderArticleCardWrapperFragment]
);
