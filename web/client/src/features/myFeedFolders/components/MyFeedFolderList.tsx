"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { MyFeedFolderType } from "@/types/myFeedFolder";

import { MyFeedFolderCard } from "./MyFeedFolderCard";

type MyFeedFolderListProps = {
  initialMyFeedFolders: MyFeedFolderType[];
  user?: User;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({
  initialMyFeedFolders,
  user,
}) => {
  return (
    <>
      {initialMyFeedFolders.length === 0 ? (
        <div className="h-[590px] md:h-[540px]">
          <NotFoundList message="No articles found" />
        </div>
      ) : (
        <div className="m-auto h-[590px] overflow-y-scroll md:h-[540px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {initialMyFeedFolders.map((myFeedFolder) => (
              <MyFeedFolderCard
                key={myFeedFolder.id}
                myFeedFolder={myFeedFolder}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
