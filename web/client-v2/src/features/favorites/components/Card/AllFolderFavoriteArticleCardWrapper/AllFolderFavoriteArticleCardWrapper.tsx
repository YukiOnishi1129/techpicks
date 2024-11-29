"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import {
  AllFolderFavoriteArticleCardWrapperFragment,
  FavoriteFolderAllFolderArticleCardWrapperFragment,
} from "./AllFolderFavoriteArticleCardWrapperFragment";

type AllFolderFavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof AllFolderFavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderAllFolderArticleCardWrapperFragment
  >;
};

export const AllFolderFavoriteArticleCardWrapper: FC<
  AllFolderFavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders }) => {
  const fragment = readFragment(
    AllFolderFavoriteArticleCardWrapperFragment,
    data
  );
  const foldersFragment = readFragment(
    FavoriteFolderAllFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );
  return <div></div>;
};
