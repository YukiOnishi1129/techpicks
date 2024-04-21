"use client";

import { FC, useCallback, useState } from "react";

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

type FeedCardWrapperProps = {
  feed: FeedType;
  myFeedLists: Array<MyFeedListType>;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
  myFeedLists,
}: FeedCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    feed.isFollowing || false
  );

  const [showMyFeedLists, setShowMyFeedLists] = useState(myFeedLists);

  const handleCreateMyFeed = async (myFeedListId: string) => {
    const res = await fetchMyFeedCountByMyFeedListIdAndFeedIdAPI({
      feedId: feed.id,
      myFeedListId,
    });
    if (res.data?.count && res.data.count > 0) {
      failToast({
        description: "You are already following the feed",
      });
      return false;
    }
    const user = await getUser();
    if (!user) {
      failToast({
        description: "Please sign in to follow the feed",
      });
      return false;
    }
    const data = await createMyFeed({
      userId: user.id,
      myFeedListId,
      feedId: feed.id,
    });

    if (!data) {
      failToast({
        description: "Failed to follow the feed",
      });
      return false;
    }
    successToast({
      description: "Successfully followed the feed",
    });
    setIsFollowing(true);
    const updateMyFeedList = showMyFeedLists.find(
      (myFeedList) => myFeedList.id === myFeedListId
    );
    if (updateMyFeedList) {
      const newMyFeedList: MyFeedListType = {
        ...updateMyFeedList,
        feeds: [
          ...updateMyFeedList.feeds,
          {
            id: feed.id,
            name: feed.name,
            description: feed.description,
            thumbnailUrl: feed.thumbnailUrl,
            siteUrl: feed.siteUrl,
            isTrending: feed.isTrending,
            createdAt: feed.createdAt,
            updatedAt: feed.updatedAt,
            category: {
              id: feed.category.id,
              type: feed.category.type,
              name: feed.category.name,
              createdAt: feed.category.createdAt,
              updatedAt: feed.category.updatedAt,
            },
            platform: {
              id: feed.platform.id,
              name: feed.platform.name,
              siteUrl: feed.platform.siteUrl,
              faviconUrl: feed.platform.faviconUrl,
              platformType: feed.platform.platformType,
              isEng: feed.platform.isEng,
              createdAt: feed.platform.createdAt,
              updatedAt: feed.platform.updatedAt,
            },
          },
        ],
      };
      setShowMyFeedLists((prev) => [
        ...prev.filter((myFeedList) => myFeedList.id !== myFeedListId),
        newMyFeedList,
      ]);
    }
    return true;
  };

  const handleRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedListId: string) => {
      // check count myFeed by myFeedId
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please sign in to follow the feed",
        });
        return;
      }
      const data = await deleteMyFeed({
        id: myFeedId,
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
      // count myFeedLists
      // if count is 0, isFollowing = false
      // else not
    },
    [successToast, failToast]
  );

  return (
    <div key={feed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="w-full rounded md:relative">
        <FeedCard feed={feed} />
        <div className="right-4 top-0 md:absolute">
          <FollowDropdownMenu
            feedId={feed.id}
            isFollowing={isFollowing}
            myFeedLists={showMyFeedLists}
            handleCreateMyFeed={handleCreateMyFeed}
          />
        </div>
      </div>
    </div>
  );
};
