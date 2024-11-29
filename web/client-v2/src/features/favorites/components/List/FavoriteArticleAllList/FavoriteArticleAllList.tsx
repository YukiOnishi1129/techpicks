import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { FavoriteArticleAllListFragment } from "./FavoriteArticleAllListFragment";
import { FavoriteFolderFavoriteArticleCardWrapperFragment } from "../../Card/FavoriteArticleCardWrapper/FavoriteArticleCardWrapperFragment";

type FavoriteArticleAllListProps = {
  data: FragmentOf<typeof FavoriteArticleAllListFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
};

export const FavoriteArticleAllList: FC<FavoriteArticleAllListProps> = ({
  data,
  favoriteArticleFolders,
}) => {
  const fragment = readFragment(FavoriteArticleAllListFragment, data);
  const foldersFragment = readFragment(
    FavoriteFolderFavoriteArticleCardWrapperFragment,
    favoriteArticleFolders
  );
  return <div></div>;
};
