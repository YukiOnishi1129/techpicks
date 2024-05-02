"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback } from "react";

import {
  CreateMyFeedDTO,
  bulkCreateMyFeed,
  bulkDeleteMyFeed,
} from "@/features/myFeeds/repository/myFeed";

import { useStatusToast } from "@/hooks/useStatusToast";

import { diffStringArray } from "@/lib/convert";

import { FeedType } from "@/types/feed";
import { MyFeedType } from "@/types/myFeed";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { UpdateMyFeedFolderDialog } from "./Dialog/UpdateMyFeedFolderDialog";
import { serverRevalidateMyFeedFolders } from "../actions/serverAction";

type MyFeedFolderCardProps = {
  user?: User;
  myFeedFolder: MyFeedFolderType;
  feeds: FeedType[];
  handleUpdateMyFeedFolder: ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }) => Promise<void>;
  handleDeleteMyFeedFolder: (id: string) => Promise<void>;
};

export const MyFeedFolderCard: FC<MyFeedFolderCardProps> = ({
  user,
  myFeedFolder,
  feeds,
  handleUpdateMyFeedFolder,
  handleDeleteMyFeedFolder,
}) => {
  const { successToast, failToast } = useStatusToast();
  const myFeedIdList = myFeedFolder.feeds.map((feed) => feed.id);
  const myFeeds: Array<Pick<MyFeedType, "id" | "feedId">> =
    myFeedFolder.feeds.map((feed) => {
      return {
        id: feed.myFeedId,
        feedId: feed.id,
      };
    });

  const handleBulkDeleteMyFeed = useCallback(
    async (removedFeedIds: string[]) => {
      // 1-1 check myFeedId
      // 1-2. delete MyFeed
      const deletedMyFeedIds: Array<string> = [];
      myFeeds.map((myFeed) => {
        if (removedFeedIds.includes(myFeed.feedId)) {
          deletedMyFeedIds.push(myFeed.id);
        }
      });
      // 1-2. delete MyFeed
      const deleteCount = await bulkDeleteMyFeed(deletedMyFeedIds);
      if (deleteCount !== deletedMyFeedIds.length) {
        failToast({
          description: "Fail: delete my feeds error",
        });
        return;
      }
      successToast({
        description: "Success: delete my feeds",
      });
    },
    [myFeeds, successToast, failToast]
  );

  const handleBulkCreateMyFeed = useCallback(
    async (createFeedIds: string[], userId: string) => {
      // 2-1, check feedId
      // 2-2. create MyFeed
      const myFeedList: Array<CreateMyFeedDTO> = createFeedIds.map((feedId) => {
        return {
          userId: userId,
          myFeedFolderId: myFeedFolder.id,
          feedId: feedId,
        };
      });
      // 2-3. create MyFeed
      const data = await bulkCreateMyFeed(myFeedList);
      if (data.count !== createFeedIds.length) {
        failToast({
          description: "Fail: create my feeds error",
        });
        return;
      }
      successToast({
        description: "Success: create my feeds",
      });
    },
    [successToast, failToast, myFeedFolder.id]
  );

  const handleUpdateMyFeedFolderAndInsertOrDeleteMyFeed = useCallback(
    async ({
      myFeedFolderId,
      myFeedFolderTitle,
      myFeedDescription,
      selectedFeedIds,
    }: {
      myFeedFolderId: string;
      myFeedFolderTitle: string;
      myFeedDescription: string;
      selectedFeedIds: string[];
    }) => {
      await handleUpdateMyFeedFolder({
        id: myFeedFolderId,
        title: myFeedFolderTitle,
        description: myFeedDescription,
      });
      // 1. feed delete check
      const currentSelectedFeedIds = myFeeds.map((myFeed) => myFeed.feedId);
      const removedFeedIds = diffStringArray({
        originArray: currentSelectedFeedIds,
        compareArray: selectedFeedIds,
      });
      if (removedFeedIds.length > 0) {
        await handleBulkDeleteMyFeed(removedFeedIds);
      }
      // 2. feed create check
      const createFeedIds = diffStringArray({
        originArray: selectedFeedIds,
        compareArray: currentSelectedFeedIds,
      });
      if (createFeedIds.length > 0 && user) {
        // 2-1. create MyFeed
        await handleBulkCreateMyFeed(createFeedIds, user.id);
      }
      // 3. my feed create or delete
      await serverRevalidateMyFeedFolders();
    },
    [
      user,
      myFeeds,
      handleUpdateMyFeedFolder,
      handleBulkDeleteMyFeed,
      handleBulkCreateMyFeed,
    ]
  );

  return (
    <div className="mb-4">
      <div className="h-[340px] w-full cursor-pointer rounded border-2 px-4 py-2">
        <div className="mb-2 flex h-[48px] w-full items-center justify-between border-b-2 pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            {myFeedFolder.title}
          </h3>
          <UpdateMyFeedFolderDialog
            feeds={feeds}
            myFeedFolderId={myFeedFolder.id}
            title={myFeedFolder.title}
            description={myFeedFolder?.description || ""}
            feedIdList={myFeedIdList}
            handleUpdateMyFeedFolder={
              handleUpdateMyFeedFolderAndInsertOrDeleteMyFeed
            }
            handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
          />
        </div>

        <p className="line-clamp-3 h-[62px] w-full text-sm">
          {myFeedFolder.description}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myFeedFolder.feeds.map((feed, i) => {
            return (
              <div key={`${myFeedFolder}-${feed.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-8"
                  src={feed.platform.faviconUrl}
                  alt={feed.name}
                />
                <span>{feed.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
