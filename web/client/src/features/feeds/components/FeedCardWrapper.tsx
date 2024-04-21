"use client";

import { FC, useCallback } from "react";

import { fetchMyFeedCountByMyFeedListIdAndFeedIdAPI } from "@/features/myFeeds/actions/myFeed";
import {
  createMyFeed,
  deleteMyFeed,
} from "@/features/myFeeds/repository/myFeed";
import { getUser } from "@/features/users/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FeedType } from "@/types/feed";
import { MyFeedListType } from "@/types/myFeedList";

import { FollowDropdownMenu } from "./DropdownMenu";
import { FeedCard } from "./FeedCard";
import { serverRevalidateFeed } from "../actions/serverAction";

type FeedCardWrapperProps = {
  feed: FeedType;
  myFeedLists: Array<MyFeedListType>;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
  myFeedLists,
}: FeedCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();

  const handleCreateMyFeed = async (myFeedListId: string) => {
    const res = await fetchMyFeedCountByMyFeedListIdAndFeedIdAPI({
      feedId: feed.id,
      myFeedListId,
    });
    if (res.data?.count && res.data.count > 0) {
      failToast({
        description: "You are already following the feed",
      });
      return;
    }
    const user = await getUser();
    if (!user) {
      failToast({
        description: "Please sign in to follow the feed",
      });
      return;
    }
    const id = await createMyFeed({
      userId: user.id,
      myFeedListId,
      feedId: feed.id,
    });

    if (!id) {
      failToast({
        description: "Failed to follow the feed",
      });
      return;
    }
    successToast({
      description: "Successfully followed the feed",
    });
    await serverRevalidateFeed();
  };

  const handleRemoveMyFeed = useCallback(
    async (myFeedListId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please sign in to follow the feed",
        });
        return;
      }
      const data = await deleteMyFeed({
        feedId: feed.id,
        userId: user.id,
      });

      if (!data) {
        failToast({
          description: "Failed to unfollow the feed",
        });
        return;
      }
      successToast({
        description: "Successfully unfollowed the feed",
      });
      await serverRevalidateFeed();
    },
    [successToast, failToast, feed.id]
  );

  return (
    <div key={feed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="w-full rounded md:relative">
        <FeedCard feed={feed} />
        <div className="right-4 top-0 md:absolute">
          <FollowDropdownMenu
            feedId={feed.id}
            isFollowing={feed.isFollowing}
            myFeedLists={myFeedLists}
            handleCreateMyFeed={handleCreateMyFeed}
          />
        </div>
      </div>
    </div>
  );
};
