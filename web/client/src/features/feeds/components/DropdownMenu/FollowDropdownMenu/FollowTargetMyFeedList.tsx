"use client";

import { FC, useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { MyFeedFolderType } from "@/types/myFeedFolder";

type TargetFollowMyFeedListProps = {
  feedId: string;
  myFeedFolder: MyFeedFolderType;
  handleCreateMyFeed: (myFeedFolderId: string) => Promise<string | undefined>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedFolderId: string
  ) => Promise<string | undefined>;
};

export const TargetFollowMyFeedList: FC<TargetFollowMyFeedListProps> = ({
  feedId,
  myFeedFolder,
  handleCreateMyFeed,
  handleRemoveMyFeed,
}: TargetFollowMyFeedListProps) => {
  const isFollowed = useMemo(
    () => myFeedFolder.feeds.some((feed) => feed.id === feedId),
    [feedId, myFeedFolder.feeds]
  );

  const targetMyFeedId = useMemo(() => {
    const targetFeed = myFeedFolder.feeds.find((feed) => feed.id === feedId);
    return targetFeed?.myFeedId;
  }, [feedId, myFeedFolder.feeds]);

  const onCreateMyFeed = useCallback(
    async (myFeedFolderId: string) => {
      await handleCreateMyFeed(myFeedFolderId);
    },
    [handleCreateMyFeed]
  );

  const onRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedFolderId: string) => {
      await handleRemoveMyFeed(myFeedId, myFeedFolderId);
    },
    [handleRemoveMyFeed]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{myFeedFolder.title}</p>
        {isFollowed ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
            onClick={() =>
              onRemoveMyFeed(targetMyFeedId || "", myFeedFolder.id)
            }
          >
            <span className="w-full group-hover:invisible">{"ADDED"}</span>
            <span className="invisible absolute w-full group-hover:visible">
              {"REMOVE"}
            </span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
            onClick={() => onCreateMyFeed(myFeedFolder.id)}
          >
            ADD
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
