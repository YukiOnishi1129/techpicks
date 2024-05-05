"use client";

import { FC, useCallback, useState } from "react";

import { fetchMyFeedFolderByIdAPI } from "@/features/myFeedFolders/actions/myFeedFolder";
import {
  fetchMyFeedById,
  fetchMyFeedCountByMyFeedFolderIdAndFeedIdAPI,
} from "@/features/myFeeds/actions/myFeed";
import {
  createMyFeed,
  deleteMyFeed,
} from "@/features/myFeeds/repository/myFeed";
import { getUser } from "@/features/users/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FeedType } from "@/types/feed";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { FollowDropdownMenu } from "./DropdownMenu";
import { FeedCard } from "./FeedCard";

type FeedCardWrapperProps = {
  feed: FeedType;
  myFeedFolders: Array<MyFeedFolderType>;
};

export const FeedCardWrapper: FC<FeedCardWrapperProps> = ({
  feed,
  myFeedFolders,
}: FeedCardWrapperProps) => {
  const { successToast, failToast } = useStatusToast();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    feed.isFollowing || false
  );

  const [showFeed, setShowFeed] = useState<FeedType>(feed);

  const [showMyFeedFolders, setShowMyFeedFolders] = useState<
    Array<MyFeedFolderType>
  >(
    myFeedFolders.length
      ? myFeedFolders.map((myFeedFolder) => {
          return {
            ...myFeedFolder,
            feeds: myFeedFolder.feeds.filter((myFeed) => myFeed.id === feed.id),
          };
        })
      : []
  );

  const addStateFeedInMyFeedFolder = useCallback(
    (
      targetMyFeedFolder: MyFeedFolderType,
      myFeedId: string
    ): MyFeedFolderType => {
      const newMyFeedFolder: MyFeedFolderType = {
        ...targetMyFeedFolder,
        feeds: [
          ...targetMyFeedFolder.feeds,
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
              platformSiteType: showFeed.platform.platformSiteType,
              isEng: showFeed.platform.isEng,
            },
            myFeedId: myFeedId,
          },
        ],
      };
      return newMyFeedFolder;
    },
    [showFeed]
  );

  const handleCreateMyFeed = useCallback(
    async (myFeedFolderId: string, createdMyFeedFolder?: MyFeedFolderType) => {
      // login check
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please sign in to follow the feed",
        });
        return;
      }

      // check count myFeed by myFeedFolderId and feedId
      const res = await fetchMyFeedCountByMyFeedFolderIdAndFeedIdAPI({
        feedId: showFeed.id,
        myFeedFolderId,
      });
      if (res.data?.count && res.data.count > 0) {
        failToast({
          description: "You are already following the feed",
        });
        return;
      }

      // create myFeed
      const createdData = await createMyFeed({
        userId: user.id,
        myFeedFolderId,
        feedId: showFeed.id,
      });
      if (!createdData) {
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
      // add feed to myFeedFolder
      if (createdMyFeedFolder) {
        setShowMyFeedFolders((prev) => [
          ...prev,
          addStateFeedInMyFeedFolder(createdMyFeedFolder, createdData.id),
        ]);
        return createdData.id;
      }

      const targetMyFeedFolder = showMyFeedFolders.find(
        (myFeedFolder) => myFeedFolder.id === myFeedFolderId
      );
      if (targetMyFeedFolder) {
        setShowMyFeedFolders((prev) => [
          ...prev.filter((myFeedFolder) => myFeedFolder.id !== myFeedFolderId),
          addStateFeedInMyFeedFolder(targetMyFeedFolder, createdData.id),
        ]);
      }

      setShowFeed({
        ...showFeed,
        myFeeds: [
          ...(showFeed.myFeeds || []),
          {
            id: createdData.id,
            myFeedFolderId,
            userId: user.id,
            feedId: showFeed.id,
            createdAt: createdData.createdAt,
            updatedAt: createdData.updatedAt,
          },
        ],
      });

      return createdData.id;
    },
    [
      failToast,
      showFeed,
      isFollowing,
      successToast,
      showMyFeedFolders,
      addStateFeedInMyFeedFolder,
    ]
  );

  const handleCreatedMyFeedFolder = useCallback(
    async (myFeedFolderId: string) => {
      const res = await fetchMyFeedFolderByIdAPI(myFeedFolderId);
      const newMyFeedFolders = res.data.myFeedFolders;
      const id = await handleCreateMyFeed(myFeedFolderId, newMyFeedFolders);

      if (id) {
        successToast({
          description: "Successfully followed the feed",
        });
      }
    },
    [handleCreateMyFeed, successToast]
  );

  const handleRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedFolderId: string) => {
      // check count myFeed by myFeedId
      const targetId = await fetchMyFeedById({
        id: myFeedId,
      });
      if (!targetId) {
        failToast({
          description: "Failed to unfollow the feed",
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
      // remove feed from myFeedFolder
      const targetMyFeedFolder = showMyFeedFolders.find(
        (myFeedFolder) => myFeedFolder.id === myFeedFolderId
      );
      if (targetMyFeedFolder) {
        const newMyFeedFolder: MyFeedFolderType = {
          ...targetMyFeedFolder,
          feeds: targetMyFeedFolder.feeds.filter(
            (myFeed) => myFeed.id !== showFeed.id
          ),
        };
        setShowMyFeedFolders((prev) => [
          ...prev.filter((myFeedFolder) => myFeedFolder.id !== myFeedFolderId),
          newMyFeedFolder,
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
    [successToast, failToast, showMyFeedFolders, showFeed]
  );

  return (
    <div key={showFeed.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <div className="relative w-full rounded">
        <div className="absolute right-4  top-2 z-10">
          <FollowDropdownMenu
            feedId={showFeed.id}
            isFollowing={isFollowing}
            myFeedFolders={showMyFeedFolders}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
            handleCreatedMyFeedFolder={handleCreatedMyFeedFolder}
          />
        </div>
        <FeedCard feed={showFeed} />
      </div>
    </div>
  );
};
