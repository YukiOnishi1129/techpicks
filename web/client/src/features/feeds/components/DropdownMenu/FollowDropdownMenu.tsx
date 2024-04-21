"use client";

import { FC, useCallback, useMemo, useState } from "react";

import { CreateMyFeedListDialog } from "@/features/myFeedLists/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MyFeedListType } from "@/types/myFeedList";

type FollowDropdownMenuProps = {
  feedId: string;
  isFollowing: boolean | undefined;
  myFeedLists: Array<MyFeedListType>;
  handleCreateMyFeed: (myFeedListId: string) => Promise<boolean>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedListId: string
  ) => Promise<boolean>;
};

export async function FollowDropdownMenu({
  feedId,
  isFollowing,
  myFeedLists,
  handleCreateMyFeed,
  handleRemoveMyFeed,
}: FollowDropdownMenuProps) {
  const sortedMyFeedLists = myFeedLists.sort((prev, next) => {
    if (prev.createdAt < next.createdAt) return -1;
    if (prev.createdAt > next.createdAt) return 1;
    return 0;
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isFollowing ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative font-bold "
          >
            <span className="w-full group-hover:invisible">{"FOLLOWING"}</span>
            <span className="invisible absolute w-full group-hover:visible">
              {"EDIT"}
            </span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
          >
            {"FOLLOW"}
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuSeparator />

        {sortedMyFeedLists.length &&
          sortedMyFeedLists.map((myFeedList) => (
            <TargetFollowMyFeedList
              key={`${feedId}-${myFeedList.id}`}
              feedId={feedId}
              myFeedList={myFeedList}
              handleCreateMyFeed={handleCreateMyFeed}
              handleRemoveMyFeed={handleRemoveMyFeed}
            />
          ))}
        <DropdownMenuLabel>
          <CreateMyFeedListDialog handleCreateMyFeed={handleCreateMyFeed} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TargetFollowMyFeedListProps = {
  feedId: string;
  myFeedList: MyFeedListType;
  handleCreateMyFeed: (myFeedListId: string) => Promise<boolean>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedListId: string
  ) => Promise<boolean>;
};

const TargetFollowMyFeedList: FC<TargetFollowMyFeedListProps> = ({
  feedId,
  myFeedList,
  handleCreateMyFeed,
  handleRemoveMyFeed,
}: TargetFollowMyFeedListProps) => {
  const isFollowed = useMemo(
    () => myFeedList.feeds.some((feed) => feed.id === feedId),
    [feedId, myFeedList.feeds]
  );
  const [isAddedMyFeed, setIsAddedMyFeed] = useState(isFollowed);

  const targetMyFeedId = useMemo(() => {
    const targetFeed = myFeedList.feeds.find((feed) => feed.id === feedId);
    return targetFeed?.myFeedId;
  }, [feedId, myFeedList.feeds]);

  const onCreateMyFeed = useCallback(
    async (myFeedListId: string) => {
      const isSuccess = await handleCreateMyFeed(myFeedListId);
      if (isSuccess) setIsAddedMyFeed(true);
    },
    [handleCreateMyFeed]
  );

  const onRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedListId: string) => {
      const isSuccess = await handleRemoveMyFeed(myFeedId, myFeedListId);
      if (isSuccess) setIsAddedMyFeed(false);
    },
    [handleRemoveMyFeed]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{myFeedList.title}</p>
        {isAddedMyFeed ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
            onClick={() => onRemoveMyFeed(targetMyFeedId || "", myFeedList.id)}
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
            onClick={() => onCreateMyFeed(myFeedList.id)}
          >
            ADD
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
