import { FragmentOf, readFragment } from "gql.tada";
import { useCallback } from "react";

import { UseManageMyFeedFolderFragment } from "./UseManageMyFeedFolderFragment";

type useManageMyFeedFolderParams = {
  data: FragmentOf<typeof UseManageMyFeedFolderFragment>;
};

export const useManageMyFeedFolder = ({
  data,
}: useManageMyFeedFolderParams) => {
  const fragment = readFragment(UseManageMyFeedFolderFragment, data);

  const handleUpdateMyFeedFolder = useCallback(
    async ({
      title,
      description,
      selectedFeedIds,
    }: {
      title: string;
      description: string;
      selectedFeedIds: string[];
    }) => {},
    []
  );

  const handleDeleteMyFeedFolder = useCallback(async () => {}, []);

  return { handleUpdateMyFeedFolder, handleDeleteMyFeedFolder };
};
