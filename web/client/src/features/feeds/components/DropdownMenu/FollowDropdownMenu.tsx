"use client";

import { FC, useMemo } from "react";

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
  handleCreateMyFeed: (myFeedListId: string) => Promise<void>;
};

export async function FollowDropdownMenu({
  feedId,
  isFollowing,
  myFeedLists,
  handleCreateMyFeed,
}: FollowDropdownMenuProps) {
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

        {myFeedLists.length &&
          myFeedLists.map((myFeedList) => (
            <TargetFollowMyFeedList
              key={`${feedId}-${myFeedList.id}`}
              feedId={feedId}
              myFeedList={myFeedList}
              handleCreateMyFeed={handleCreateMyFeed}
            />
          ))}
        <DropdownMenuLabel>
          <CreateMyFeedListDialog />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TargetFollowMyFeedListProps = {
  feedId: string;
  myFeedList: MyFeedListType;
  handleCreateMyFeed: (myFeedListId: string) => Promise<void>;
};

const TargetFollowMyFeedList: FC<TargetFollowMyFeedListProps> = ({
  feedId,
  myFeedList,
  handleCreateMyFeed,
}: TargetFollowMyFeedListProps) => {
  const isFollowed = useMemo(
    () => myFeedList.feeds.some((feed) => feed.id === feedId),
    [feedId, myFeedList.feeds]
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{myFeedList.title}</p>
        {isFollowed ? (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
          >
            ADDED
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
            onClick={() => handleCreateMyFeed(myFeedList.id)}
          >
            ADD
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
