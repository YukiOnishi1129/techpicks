"use client";

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
  myFeedLists: Array<MyFeedListType>;
  handleCreateMyFeed: (myFeedListId: string) => Promise<void>;
};

export async function FollowDropdownMenu({
  feedId,
  myFeedLists,
  handleCreateMyFeed,
}: FollowDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
        >
          {"FOLLOW"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuSeparator />

        {myFeedLists.length &&
          myFeedLists.map((myFeedList) => (
            <div key={`${feedId}-${myFeedList.id}`}>
              <div>
                <span>{myFeedList.title}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
                  onClick={() => handleCreateMyFeed(myFeedList.id)}
                >
                  ADD
                </Button>
              </div>
              <DropdownMenuSeparator />
            </div>
          ))}
        <DropdownMenuLabel>
          <CreateMyFeedListDialog />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
