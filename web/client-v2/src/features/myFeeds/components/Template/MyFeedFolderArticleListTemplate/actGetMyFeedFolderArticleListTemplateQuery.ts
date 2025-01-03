import { graphql } from "gql.tada";

import { FavoriteFolderArticleCardWrapperFragment } from "@/features/articles/components/Card";

import { getClient } from "@/lib/apollo/client";

import {
  FavoriteArticleFoldersInput,
  FeedsInput,
  MyFeedFolderInput,
} from "@/graphql/type";

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
    }
  `,
  [FavoriteFolderArticleCardWrapperFragment]
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
