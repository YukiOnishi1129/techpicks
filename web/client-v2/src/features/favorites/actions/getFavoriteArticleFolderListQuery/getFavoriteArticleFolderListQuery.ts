"use server";

import { readFragment } from "gql.tada";

import { FavoriteArticleFoldersInput } from "@/graphql/type";

import { favoriteArticleFolderListQuery } from "./favoriteArticleFolderListQuery";
import { FavoriteArticleFolderListTemplateFragment } from "../../components/Template/FavoriteArticleFolderListTemplate/FavoriteArticleFolderListTemplateFragment";

export const getFavoriteArticleFolderListQuery = async (
  input: FavoriteArticleFoldersInput
) => {
  const { data, error, loading } = await favoriteArticleFolderListQuery(input);

  const newData = readFragment(FavoriteArticleFolderListTemplateFragment, data);

  return { data: newData, error, loading };
};
