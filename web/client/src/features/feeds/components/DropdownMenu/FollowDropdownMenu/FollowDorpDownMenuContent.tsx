"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { CreateMyFeedFolderDialog } from "@/features/myFeedFolders/components/Dialog";

import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { MyFeedFolderType } from "@/types/myFeedFolder";

import { TargetFollowMyFeedList } from "./FollowTargetMyFeedList";

type FollowDorpDownMenuContentProps = {
  feedId: string;
  myFeedLists: Array<MyFeedFolderType>;
  handleCreateMyFeed: (myFeedFolderId: string) => Promise<string | undefined>;
  handleRemoveMyFeed: (
    myFeedId: string,
    myFeedFolderId: string
  ) => Promise<string | undefined>;
  handleCreatedMyFeedFolder: (myFeedId: string) => Promise<void>;
};

const formSchema = z.object({
  keyword: z.string(),
});

export const FollowDorpDownMenuContent: FC<FollowDorpDownMenuContentProps> = ({
  feedId,
  myFeedLists,
  handleCreateMyFeed,
  handleRemoveMyFeed,
  handleCreatedMyFeedFolder,
}: FollowDorpDownMenuContentProps) => {
  const { control, watch } = useForm<z.infer<typeof formSchema>>({
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
          <Input
            className="border-primary bg-secondary text-primary"
            placeholder="search keyword"
            {...field}
          />
        )}
      />

      <DropdownMenuSeparator />
      <div className="max-h-[200px] overflow-y-auto">
        {showMyFeedLists.map((myFeedList) => (
          <TargetFollowMyFeedList
            key={`${feedId}-${myFeedList.id}`}
            feedId={feedId}
            myFeedFolder={myFeedList}
            handleCreateMyFeed={handleCreateMyFeed}
            handleRemoveMyFeed={handleRemoveMyFeed}
          />
        ))}
      </div>
      <DropdownMenuLabel>
        <CreateMyFeedFolderDialog
          handleCreatedMyFeedFolder={handleCreatedMyFeedFolder}
        />
      </DropdownMenuLabel>
    </DropdownMenuContent>
  );
};
