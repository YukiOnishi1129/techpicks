import { useCallback } from "react";

import { getUser } from "@/features/users/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { fetchBookmarkByIdCountAPI } from "../actions/bookmark";
import { serverRevalidateBookmark } from "../actions/serverAction";
import { deleteBookmark } from "../repository/bookmark";

export const useBookmark = () => {
  const { successToast, failToast } = useStatusToast();

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      if (!bookmarkId) return;
      const res = await fetchBookmarkByIdCountAPI({
        bookmarkId: bookmarkId,
      });
      if (res.status === 401) {
        failToast({
          description: "Fail: Unauthorized",
        });
        return;
      }
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

      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
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
      await serverRevalidateBookmark();
    },
    [successToast, failToast]
  );

  return { handleRemoveBookmark };
};
