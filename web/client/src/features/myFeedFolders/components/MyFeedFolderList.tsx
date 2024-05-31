"use client";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { FC, useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/users/actions/user";

import { NotFoundList } from "@/components/layout/NotFoundList";

import { useStatusToast } from "@/hooks/useStatusToast";

import { MyFeedFolderType } from "@/types/myFeedFolder";

import { serverRevalidatePage } from "@/actions/serverAction";

import { MyFeedFolderCard } from "./MyFeedFolderCard";
import { fetchMyFeedFolderByIdAPI } from "../actions/myFeedFolder";
import {
  deleteMyFeedFolder,
  updateMyFeedFolder,
} from "../repository/myFeedFolder";

type MyFeedFolderListProps = {
  initialMyFeedFolders: MyFeedFolderType[];
  user?: User;
};

export const MyFeedFolderList: FC<MyFeedFolderListProps> = ({
  initialMyFeedFolders,
  user,
}) => {
  const { successToast, failToast } = useStatusToast();
  const pathname = usePathname();

  const handleUpdateMyFeedFolder = useCallback(
    async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description: string;
    }) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please login to create a new feed folder",
        });
        await logoutToLoginPage();
        return;
      }
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
      const updatedId = await updateMyFeedFolder({
        id,
        title,
        description,
        userId: user.id,
      });
      if (!updatedId) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Update my feed folder",
      });
    },
    [successToast, failToast]
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
      await serverRevalidatePage(pathname);
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
                user={user}
                myFeedFolder={myFeedFolder}
                handleUpdateMyFeedFolder={handleUpdateMyFeedFolder}
                handleDeleteMyFeedFolder={handleDeleteMyFeedFolder}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
