import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/users/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { serverRevalidatePage } from "@/actions/serverAction";

import { fetchBookmarkByIdCountAPI } from "../actions/bookmark";
import { deleteBookmark } from "../repository/bookmark";

export const useBookmark = (pathname: string) => {
  const { successToast, failToast } = useStatusToast();

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
        });
        await logoutToLoginPage();
        return;
      }

      if (!bookmarkId) return;
      const res = await fetchBookmarkByIdCountAPI({
        bookmarkId: bookmarkId,
      });
      if (res.status !== 200) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      if (!res.data?.count) {
        failToast({
          description: "Fail: Bookmark not found",
        });
        return;
      }

      const id = await deleteBookmark({
        bookmarkId: bookmarkId,
        userId: user?.id || "",
      });
      if (!id) {
        failToast({
          description: "Fail: Something went wrong",
        });
        return;
      }
      successToast({
        description: "Remove bookmark",
      });
      await serverRevalidatePage(pathname);
    },
    [successToast, failToast, pathname]
  );

  return { handleRemoveBookmark };
};
