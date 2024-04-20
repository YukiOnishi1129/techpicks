"use client";

import { FC } from "react";

import { FeedType } from "@/types/feed";
import { MyFeedListType } from "@/types/myFeedList";

import { FollowDropdownMenu } from "./DropdownMenu";
import { FeedCard } from "./FeedCard";

type FeedCardWrapperProps = {
  feed: FeedType;
  myFeedLists: Array<MyFeedListType>;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
  myFeedLists,
}: FeedCardWrapperProps) => {
  return (
    <div key={feed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="w-full rounded md:relative">
        <FeedCard feed={feed} />
        <div className="right-4 top-0 md:absolute">
          <FollowDropdownMenu feedId={feed.id} myFeedLists={myFeedLists} />
        </div>
      </div>
    </div>
  );
};
