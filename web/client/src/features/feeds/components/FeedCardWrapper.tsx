"use client";

import { FC } from "react";

import { FeedType } from "@/types/feed";

import { FollowDropdownMenu } from "./DropdownMenu";
import { FeedCard } from "./FeedCard";

type FeedCardWrapperProps = {
  feed: FeedType;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
}: FeedCardWrapperProps) => {
  return (
    <div key={feed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="w-full rounded md:relative">
        <FeedCard feed={feed} />
        <div className="right-4 top-0 md:absolute">
          <FollowDropdownMenu />
        </div>
      </div>
    </div>
  );
};
