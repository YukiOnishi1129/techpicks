"use client";

import { FC } from "react";

import { FeedType } from "@/types/feed";

import { FeedCard } from "./FeedCard";

type FeedCardWrapperProps = {
  feed: FeedType;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
}: FeedCardWrapperProps) => {
  return (
    <div key={feed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <FeedCard feed={feed} />
    </div>
  );
};
