import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { serverRevalidatePage } from "@/actions/actServerRevalidatePage";

import { deleteBookmarkMutation } from "../actions/actDeleteBookmarkMutation";

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

      const { data, error } = await deleteBookmarkMutation({
        bookmarkId: bookmarkId,
        userId: user?.id || "",
      });
      let errMsg = "";
      if (error) {
        errMsg = "Fail: Something went wrong";
        if (error.length > 0) {
          errMsg = error[0].message;
        }
      }
      if (!data?.deleteBookmark) errMsg = "Fail: Something went wrong";
      if (errMsg !== "") {
        failToast({
          description: errMsg,
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
