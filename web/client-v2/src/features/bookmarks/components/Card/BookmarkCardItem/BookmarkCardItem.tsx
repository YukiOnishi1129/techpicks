"use client";

import { FragmentOf } from "gql.tada";
import { FC } from "react";

import { BookmarkCardItemFragment } from "./BookmarkCardItemFragment";

type BookmarkCardItemProps = {
  data: FragmentOf<typeof BookmarkCardItemFragment>;
};

export const BookmarkCardItem: FC<BookmarkCardItemProps> = ({ data }) => {
  return <div></div>;
};
