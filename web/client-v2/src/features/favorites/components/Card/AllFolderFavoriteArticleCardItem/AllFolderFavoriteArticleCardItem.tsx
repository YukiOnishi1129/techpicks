"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { AllFolderFavoriteArticleCardItemFragment } from "./AllFolderFavoriteArticleCardItemFragment";

type Props = {
  data: FragmentOf<typeof AllFolderFavoriteArticleCardItemFragment>;
};

export const AllFolderFavoriteArticleCardItem: FC<Props> = ({ data }) => {
  const fragment = readFragment(AllFolderFavoriteArticleCardItemFragment, data);
  return <div></div>;
};
