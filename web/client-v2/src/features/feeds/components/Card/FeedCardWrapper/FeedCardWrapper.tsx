"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { FeedCardWrapperFragment } from "./FeedCardWrapperFragment";
import { FeedCardItem } from "../FeedCardItem";

type FeedCardWrapperProps = {
  data: FragmentOf<typeof FeedCardWrapperFragment>;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({ data }) => {
  const fragment = readFragment(FeedCardWrapperFragment, data);
  return (
    <div
      key={fragment.id}
      className="rounded-2xl border bg-primary-foreground md:py-2"
    >
      <div className="relative w-full rounded"></div>

      <FeedCardItem data={fragment} />
    </div>
  );
};
