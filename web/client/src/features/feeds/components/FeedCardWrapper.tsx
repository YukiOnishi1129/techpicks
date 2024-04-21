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

  const [showFeed, setShowFeed] = useState<FeedType>(feed);

  const [showMyFeedLists, setShowMyFeedLists] = useState<Array<MyFeedListType>>(
    myFeedLists.map((myFeedList) => {
      return {
        ...myFeedList,
        feeds: myFeedList.feeds.filter((myFeed) => myFeed.id === feed.id),
      };
    })
  );

  const handleCreateMyFeed = useCallback(
    async (myFeedListId: string) => {
      const res = await fetchMyFeedCountByMyFeedListIdAndFeedIdAPI({
        feedId: showFeed.id,
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
        feedId: showFeed.id,
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

      if (!isFollowing) setIsFollowing(true);
      const targetMyFeedList = showMyFeedLists.find(
        (myFeedList) => myFeedList.id === myFeedListId
      );
      if (targetMyFeedList) {
        const newMyFeedList: MyFeedListType = {
          ...targetMyFeedList,
          feeds: [
            ...targetMyFeedList.feeds,
            {
              id: showFeed.id,
              name: showFeed.name,
              description: showFeed.description,
              thumbnailUrl: showFeed.thumbnailUrl,
              siteUrl: showFeed.siteUrl,
              isTrending: showFeed.isTrending,
              createdAt: showFeed.createdAt,
              updatedAt: showFeed.updatedAt,
              category: {
                id: showFeed.category.id,
                type: showFeed.category.type,
                name: showFeed.category.name,
                createdAt: showFeed.category.createdAt,
                updatedAt: showFeed.category.updatedAt,
              },
              platform: {
                id: showFeed.platform.id,
                name: showFeed.platform.name,
                siteUrl: showFeed.platform.siteUrl,
                faviconUrl: showFeed.platform.faviconUrl,
                platformType: showFeed.platform.platformType,
                isEng: showFeed.platform.isEng,
                createdAt: showFeed.platform.createdAt,
                updatedAt: showFeed.platform.updatedAt,
              },
              myFeedId: data.id,
            },
          ],
        };
        setShowMyFeedLists((prev) => [
          ...prev.filter((myFeedList) => myFeedList.id !== myFeedListId),
          newMyFeedList,
        ]);
      }
      return true;
    },
    [failToast, showFeed, isFollowing, successToast, showMyFeedLists]
  );

  const handleRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedListId: string) => {
      // TODO: check count myFeed by myFeedId
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please sign in to follow the feed",
        });
        return false;
      }
      const data = await deleteMyFeed({
        id: myFeedId,
        userId: user.id,
      });

      if (!data) {
        failToast({
          description: "Failed to unfollow the feed",
        });
        return false;
      }
      successToast({
        description: "Successfully unfollowed the feed",
      });

      // state update
      // remove feed from myFeedList
      const targetMyFeedList = showMyFeedLists.find(
        (myFeedList) => myFeedList.id === myFeedListId
      );
      if (targetMyFeedList) {
        const newMyFeedList: MyFeedListType = {
          ...targetMyFeedList,
          feeds: targetMyFeedList.feeds.filter(
            (myFeed) => myFeed.id !== showFeed.id
          ),
        };
        setShowMyFeedLists((prev) => [
          ...prev.filter((myFeedList) => myFeedList.id !== myFeedListId),
          newMyFeedList,
        ]);
      }

      if (showFeed?.myFeeds) {
        const newFeed: FeedType = {
          ...showFeed,
          myFeeds: showFeed.myFeeds.filter((myFeed) => myFeed.id !== myFeedId),
        };
        setShowFeed(newFeed);
        if (!newFeed?.myFeeds || newFeed.myFeeds.length === 0) {
          setIsFollowing(false);
        }
      }

      return true;
    },
    [successToast, failToast, showMyFeedLists, showFeed]
  );

  return (
    <div key={showFeed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="w-full rounded md:relative">
        <FeedCard feed={showFeed} />
        <div className="right-4 top-0 md:absolute">
          <FollowDropdownMenu
            feedId={showFeed.id}
            isFollowing={isFollowing}
            myFeedLists={showMyFeedLists}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
          />
        </div>
      </div>
    </div>
  );
};
