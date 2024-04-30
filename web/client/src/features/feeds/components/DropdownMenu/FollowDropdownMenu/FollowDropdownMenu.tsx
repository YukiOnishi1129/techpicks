"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MyFeedListType } from "@/types/myFeedList";

import { FollowDorpDownMenuContent } from "./FollowDorpDownMenuContent";

type FollowDropdownMenuProps = {
  feedId: string;
  isFollowing: boolean | undefined;
  myFeedLists: Array<MyFeedListType>;
  handleCreateMyFeed: (myFeedListId: string) => Promise<string | undefined>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedListId: string
  ) => Promise<string | undefined>;
  handleCreatedMyFeedLists: (myFeedId: string) => Promise<void>;
};

export function FollowDropdownMenu({
  feedId,
  isFollowing,
  myFeedLists,
  handleCreateMyFeed,
  handleRemoveMyFeed,
  handleCreatedMyFeedLists,
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
      <FollowDorpDownMenuContent
        feedId={feedId}
        myFeedLists={sortedMyFeedLists}
        handleCreateMyFeed={handleCreateMyFeed}
        handleRemoveMyFeed={handleRemoveMyFeed}
        handleCreatedMyFeedLists={handleCreatedMyFeedLists}
      />
    </DropdownMenu>
  );
}
