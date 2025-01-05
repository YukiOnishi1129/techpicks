import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

import {
  FavoriteArticleFoldersInput,
  FeedsInput,
  MyFeedFolderInput,
} from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";


import { MyFeedFolderArticleListFragment } from "../../List/MyFeedFolderArticleList/MyFeedFolderArticleListFragment";

export const GetMyFeedFolderArticleListTemplateQuery = graphql(
  `
    query GetMyFeedFolderArticleListTemplateQuery(
      $myFeedFolderInput: MyFeedFolderInput!
      $feedsInput: FeedsInput!
      $favoriteArticleFoldersInput: FavoriteArticleFoldersInput!
    ) {
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
      ...MyFeedFolderArticleListFragment
    }
  `,
  [FavoriteFolderArticleCardWrapperFragment, MyFeedFolderArticleListFragment]
);

export const getMyFeedFolderArticleListTemplateQuery = async (
  myFeedFolderInput: MyFeedFolderInput,
  feedsInput: FeedsInput,
  favoriteArticleFoldersInput: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await getClient().query({
    query: GetMyFeedFolderArticleListTemplateQuery,
    variables: {
      myFeedFolderInput,
      feedsInput,
      favoriteArticleFoldersInput,
    },
    errorPolicy: "all",
  });

  return { data, error, loading };
};
