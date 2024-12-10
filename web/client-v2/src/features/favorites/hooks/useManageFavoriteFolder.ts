import { useMutation } from "@apollo/client";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/hooks/useStatusToast";

import { DeleteFavoriteArticleFolderMutation } from "../mutations/DeleteFavoriteArticleFolderMutation";
import { UpdateFavoriteArticleFolderMutation } from "../mutations/UpdateFavoriteArticleFolderMutation";

export const useManageFavoriteFolder = () => {
  const { successToast, failToast } = useStatusToast();

  const [updateFavoriteArticleFolderMutation] = useMutation(
    UpdateFavoriteArticleFolderMutation
  );

  const [deleteFavoriteArticleFolderMutation] = useMutation(
    DeleteFavoriteArticleFolderMutation
  );

  const handleUpdateFavoriteArticleFolder = useCallback(
    async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description?: string;
    }) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Please login to edit a favorite folder",
        });
        await logoutToLoginPage();
        return;
      }
      const { errors } = await updateFavoriteArticleFolderMutation({
        variables: {
          input: {
            id,
            title,
            description,
          },
        },
        update: (cache, data) => {
          if (data.data?.updateFavoriteArticleFolder) {
            cache.modify({
              id: cache.identify(data.data.updateFavoriteArticleFolder),
              fields: {
                title() {
                  return title;
                },
                description() {
                  return description;
                },
              },
            });
          }
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
        description: `Updated favorite article folder: "${title}"`,
      });
    },
    [successToast, failToast, updateFavoriteArticleFolderMutation]
  );

  const handleDeleteFavoriteArticleFolder = useCallback(
    async (id: string, title: string) => {
      const user = await getUser();
      // 1. login check
      if (!user) {
        failToast({
          description: "Please login to delete a favorite folder",
        });
        await logoutToLoginPage();
        return;
      }

      const { errors } = await deleteFavoriteArticleFolderMutation({
        variables: {
          input: {
            id,
          },
        },
        update: (cache) => {
          cache.evict({ id: `FavoriteArticleFolder:${id}` });
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
        description: `Deleted favorite article folder: "${title}"`,
      });
    },
    [successToast, failToast, deleteFavoriteArticleFolderMutation]
  );

  return {
    handleUpdateFavoriteArticleFolder,
    handleDeleteFavoriteArticleFolder,
  };
};
