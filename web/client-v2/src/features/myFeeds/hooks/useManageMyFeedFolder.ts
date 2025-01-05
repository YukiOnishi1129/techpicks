import { useMutation } from "@apollo/client";
import { FragmentOf, readFragment } from "gql.tada";
import { useCallback } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
import { getUser } from "@/features/auth/actions/user";

import { useStatusToast } from "@/shared/hooks/useStatusToast";

import { UseManageMyFeedFolderFragment } from "./UseManageMyFeedFolderFragment";
import { UpdateMyFeedFolderMutation } from "../mutation/UpdateMyFeedFolderMutation";

type useManageMyFeedFolderParams = {
  data: FragmentOf<typeof UseManageMyFeedFolderFragment>;
};

export const useManageMyFeedFolder = ({
  data,
}: useManageMyFeedFolderParams) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(UseManageMyFeedFolderFragment, data);

  const [updateMyFeedFolderMutation] = useMutation(UpdateMyFeedFolderMutation);

  const handleUpdateMyFeedFolder = useCallback(
    async ({
      title,
      description,
      selectedFeedIds,
    }: {
      title: string;
      description: string;
      selectedFeedIds: string[];
    }) => {
      const user = await getUser();
      if (!user) {
        failToast({
          description: "Fail: Please login to add favorite article",
        });
        await logoutToLoginPage();
        return;
      }

      const { errors } = await updateMyFeedFolderMutation({
        variables: {
          input: {
            myFeedFolderId: fragment.id,
            title,
            description,
            feedIds: selectedFeedIds,
          },
        },
        update: (cache, { data }) => {
          if (!data?.updateMyFeedFolder) return;
          const updatedMyFeedFolder = data.updateMyFeedFolder;
          cache.modify({
            id: cache.identify(data.updateMyFeedFolder),
            fields: {
              title() {
                return updatedMyFeedFolder.title;
              },
              description() {
                return updatedMyFeedFolder.description;
              },
              feeds() {
                return updatedMyFeedFolder.feeds;
              },
            },
          });
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
        description: `Updated my feed folder: "${title}"`,
      });
    },
    [successToast, failToast, fragment.id, updateMyFeedFolderMutation]
  );

  const handleDeleteMyFeedFolder = useCallback(async () => {}, []);

  return { handleUpdateMyFeedFolder, handleDeleteMyFeedFolder };
};
