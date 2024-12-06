import { cache, useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { graphql } from "gql.tada";
import { useMutation } from "@apollo/client";

const DeleteBookmarkMutation = graphql(`
  mutation DeleteBookmarkMutation($input: DeleteBookmarkInput!) {
    deleteBookmark(deleteBookmarkInput: $input)
  }
`);

export const useBookmarkMutation = () => {
  const { successToast, failToast } = useStatusToast();

  const [deleteBookmarkMutation] = useMutation(DeleteBookmarkMutation);

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string, title: string) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to remove bookmark",
        });
        await logoutToLoginPage();
        return;
      }

      if (!bookmarkId) return;

      const { errors } = await deleteBookmarkMutation({
        variables: {
          input: {
            bookmarkId,
            userId: user.id,
          },
        },
        update: (cache) => {
          cache.evict({ id: `Bookmark:${bookmarkId}` });
        },
      });

      let errMsg = "";
      if (errors) {
        errMsg = "Fail: Something went wrong";
        if (errors.length > 0) {
          errMsg = errors[0].message;
        }
      }

      if (errMsg !== "") {
        failToast({
          description: errMsg,
        });
        return;
      }

      successToast({
        description: `Bookmark removed: 【 ${title} 】`,
      });
    },
    [successToast, failToast]
  );

  return { handleRemoveBookmark };
};
