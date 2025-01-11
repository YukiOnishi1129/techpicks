"use client";

import { FC, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

type SelectMultiFavoriteFolderDialogContentProps = {
  selectedFolderList?: Array<SelectOptionType>;
  onDialogClose: () => void;
  onSelectFolderList?: (selectedFolderList: Array<SelectOptionType>) => void;
};

export const SelectMultiFavoriteFolderDialogContent: FC<
  SelectMultiFavoriteFolderDialogContentProps
> = ({ selectedFolderList, onDialogClose, onSelectFolderList }) => {
  const handleSelectFolderList = useCallback(
    (targetSelectedFolderList: Array<SelectOptionType>) => {
      if (onSelectFolderList) onSelectFolderList(targetSelectedFolderList);
      onDialogClose();
    },
    [onSelectFolderList, onDialogClose]
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select Favorite Folders"}</DialogTitle>
      </DialogHeader>
      {/* <SelectMultiFeedList
        defaultSelectedFeedList={selectedFeedList}
        feedsEndCursor={feedsEndCursor}
        onSelectFeedList={handleSelectFeedList}
      /> */}
    </DialogContent>
  );
};
