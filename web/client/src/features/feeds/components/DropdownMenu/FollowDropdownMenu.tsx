"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { CreateMyFeedListDialog } from "@/features/myFeedLists/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { MyFeedListType } from "@/types/myFeedList";

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

export async function FollowDropdownMenu({
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

type FollowDorpDownMenuContentProps = {
  feedId: string;
  myFeedLists: Array<MyFeedListType>;
  handleCreateMyFeed: (myFeedListId: string) => Promise<string | undefined>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedListId: string
  ) => Promise<string | undefined>;
  handleCreatedMyFeedLists: (myFeedId: string) => Promise<void>;
};

const formSchema = z.object({
  keyword: z.string(),
});

const FollowDorpDownMenuContent: FC<FollowDorpDownMenuContentProps> = ({
  feedId,
  myFeedLists,
  handleCreateMyFeed,
  handleRemoveMyFeed,
  handleCreatedMyFeedLists,
}: FollowDorpDownMenuContentProps) => {
  const { getValues, control, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const searchKeyword = watch("keyword");

  const showMyFeedLists = useMemo(() => {
    if (!searchKeyword) return myFeedLists;
    return myFeedLists.filter((myFeedList) =>
      myFeedList.title.includes(searchKeyword)
    );
  }, [myFeedLists, searchKeyword]);

  return (
    <DropdownMenuContent align="end" className="w-[200px]">
      <Controller
        name="keyword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input placeholder="search keyword" {...field} />
        )}
      />

      <DropdownMenuSeparator />
      <div className="max-h-[200px] overflow-y-auto">
        {showMyFeedLists.map((myFeedList) => (
          <TargetFollowMyFeedList
            key={`${feedId}-${myFeedList.id}`}
            feedId={feedId}
            myFeedList={myFeedList}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
          />
        ))}
      </div>
      <DropdownMenuLabel>
        <CreateMyFeedListDialog
          handleCreatedMyFeedLists={handleCreatedMyFeedLists}
        />
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};

type TargetFollowMyFeedListProps = {
  feedId: string;
  myFeedList: MyFeedListType;
  handleCreateMyFeed: (myFeedListId: string) => Promise<string | undefined>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedListId: string
  ) => Promise<string | undefined>;
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

  const targetMyFeedId = useMemo(() => {
    const targetFeed = myFeedList.feeds.find((feed) => feed.id === feedId);
    return targetFeed?.myFeedId;
  }, [feedId, myFeedList.feeds]);

  const onCreateMyFeed = useCallback(
    async (myFeedListId: string) => {
      await handleCreateMyFeed(myFeedListId);
    },
    [handleCreateMyFeed]
  );

  const onRemoveMyFeed = useCallback(
    async (myFeedId: string, myFeedListId: string) => {
      await handleRemoveMyFeed(myFeedId, myFeedListId);
    },
    [handleRemoveMyFeed]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{myFeedList.title}</p>
        {isFollowed ? (
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
