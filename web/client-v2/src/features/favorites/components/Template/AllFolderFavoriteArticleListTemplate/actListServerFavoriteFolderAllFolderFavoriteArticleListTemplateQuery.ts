"use server";

import { graphql } from "gql.tada";

import { FavoriteArticleFoldersInput } from "@/graphql/type";
import { getClient } from "@/shared/lib/apollo/client";

import { CreateMultiFolderFavoriteArticleDialogFragment } from "../../Dialog/CreateMultiFolderFavoriteArticleDialog/CreateMultiFolderFavoriteArticleDialogFragment";

const ListServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery =
  graphql(
    `
      query GetServerFavoriteFoldersAllFolderFavoriteArticleListTemplateQuery(
        $input: FavoriteArticleFoldersInput
      ) {
        favoriteArticleFolders(input: $input) {
          ...CreateMultiFolderFavoriteArticleDialogFragment
        }
      }
    `,
    [CreateMultiFolderFavoriteArticleDialogFragment]
  );

export const listServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery =
  async (input: FavoriteArticleFoldersInput) => {
    const { data, error, loading } = await getClient().query({
      query: ListServerFavoriteFolderAllFolderFavoriteArticleListTemplateQuery,
      variables: { input },
      errorPolicy: "all",
    });
    return { data, error, loading };
  };
