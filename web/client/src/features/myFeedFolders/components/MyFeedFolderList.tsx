"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback } from "react";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { useStatusToast } from "@/hooks/useStatusToast";

import { MyFeedFolderType } from "@/types/myFeedFolder";

import { MyFeedFolderCard } from "./MyFeedFolderCard";
import { fetchMyFeedFolderByIdAPI } from "../actions/myFeedFolder";
import { serverRevalidateMyFeedFolders } from "../actions/serverAction";
import { deleteMyFeedFolder } from "../repository/myFeedFolder";

type MyFeedFolderListProps = {
  initialMyFeedFolders: MyFeedFolderType[];
  user?: User;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({
  initialMyFeedFolders,
  user,
}) => {
  const { successToast, failToast } = useStatusToast();
  const handleUpdateMyFeedFolder = useCallback(
    async (id: string) => {
      // 1. folder check
      const fetchRes = await fetchMyFeedFolderByIdAPI(id);
      if (fetchRes.status === 401) {
        failToast({
          description: "Fail: Unauthorized",
        });
        return;
      }
      if (fetchRes.status !== 200) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      // 2. update folder
      console.log("update my feed folder");
    },
    [failToast]
  );

  const handleDeleteMyFeedFolder = useCallback(
    async (id: string) => {
      // 1. folder check
      const fetchRes = await fetchMyFeedFolderByIdAPI(id);
      if (fetchRes.status === 401) {
        failToast({
          description: "Fail: Unauthorized",
        });
        return;
      }
      if (fetchRes.status !== 200) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      // 2. delete folder
      const deletedId = await deleteMyFeedFolder(id);
      if (!deletedId) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Delete my feed folder",
      });
      await serverRevalidateMyFeedFolders();
    },
    [successToast, failToast]
  );

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
                handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
