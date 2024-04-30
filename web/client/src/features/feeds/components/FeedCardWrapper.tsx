"use client";

import { FC, useCallback, useState } from "react";

import { fetchMyFeedListById } from "@/features/myFeedLists/actions/myFeedList";
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

  const addStateFeedInMyFeedList = useCallback(
    (targetMyFeedList: MyFeedListType, myFeedId: string): MyFeedListType => {
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
            apiQueryParam: showFeed.apiQueryParam,
            trendPlatformType: showFeed.trendPlatformType,
            category: {
              id: showFeed.category.id,
              type: showFeed.category.type,
              name: showFeed.category.name,
            },
            platform: {
              id: showFeed.platform.id,
              name: showFeed.platform.name,
              siteUrl: showFeed.platform.siteUrl,
              faviconUrl: showFeed.platform.faviconUrl,
              platformType: showFeed.platform.platformType,
              isEng: showFeed.platform.isEng,
            },
            myFeedId: myFeedId,
          },
        ],
      };
      return newMyFeedList;
    },
    [showFeed]
  );

  const handleCreateMyFeed = useCallback(
    async (myFeedListId: string, createdMyFeedList?: MyFeedListType) => {
      // check count myFeed by myFeedListId and feedId
      const res = await fetchMyFeedCountByMyFeedListIdAndFeedIdAPI({
        feedId: showFeed.id,
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

      // create myFeed
      const data = await createMyFeed({
        userId: user.id,
        myFeedListId,
        feedId: showFeed.id,
      });
      if (!data) {
        failToast({
          description: "Failed to follow the feed",
        });
        return;
      }
      successToast({
        description: "Successfully followed the feed",
      });

      // state update
      if (!isFollowing) setIsFollowing(true);

      // add feed to myFeedList
      if (createdMyFeedList) {
        setShowMyFeedLists((prev) => [
          ...prev,
          addStateFeedInMyFeedList(createdMyFeedList, data.id),
        ]);
        return data.id;
      }

      const targetMyFeedList = showMyFeedLists.find(
        (myFeedList) => myFeedList.id === myFeedListId
      );
      if (targetMyFeedList) {
        setShowMyFeedLists((prev) => [
          ...prev.filter((myFeedList) => myFeedList.id !== myFeedListId),
          addStateFeedInMyFeedList(targetMyFeedList, data.id),
        ]);
      }
      return data.id;
    },
    [
      failToast,
      showFeed,
      isFollowing,
      successToast,
      showMyFeedLists,
      addStateFeedInMyFeedList,
    ]
  );

  const handleCreatedMyFeedLists = useCallback(
    async (myFeedListId: string) => {
      const res = await fetchMyFeedListById(myFeedListId);
      const newMyFeedList = res.data.myFeedList;

      const id = await handleCreateMyFeed(myFeedListId, newMyFeedList);

      if (id) {
        successToast({
          description: "Successfully followed the feed",
        });
      }
    },
    [handleCreateMyFeed, successToast]
  );

  const handleRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedListId: string) => {
      // TODO: check count myFeed by myFeedId
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please sign in to follow the feed",
        });
        return;
      }
      const id = await deleteMyFeed({
        id: myFeedId,
        userId: user.id,
      });

      if (!id) {
        failToast({
          description: "Failed to unfollow the feed",
        });
        return;
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

      return id;
    },
    [successToast, failToast, showMyFeedLists, showFeed]
  );

  return (
    <div key={showFeed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="relative w-full rounded">
        <div className="absolute right-4  top-2 z-10">
          <FollowDropdownMenu
            feedId={showFeed.id}
            isFollowing={isFollowing}
            myFeedLists={showMyFeedLists}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
            handleCreatedMyFeedLists={handleCreatedMyFeedLists}
          />
        </div>
        <FeedCard feed={showFeed} />
      </div>
    </div>
  );
};
