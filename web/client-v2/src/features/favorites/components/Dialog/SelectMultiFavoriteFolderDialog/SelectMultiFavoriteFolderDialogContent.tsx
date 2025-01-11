"use client";

import { FC, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFavoriteFolderList } from "./SelectMultiFavoriteFolderList";

type SelectMultiFavoriteFolderDialogContentProps = {
  selectedFolderList?: Array<SelectOptionType>;
  foldersEndCursor?: string;
  onDialogClose: () => void;
  onSelectFolderList?: (selectedFolderList: Array<SelectOptionType>) => void;
};

export const SelectMultiFavoriteFolderDialogContent: FC<
  SelectMultiFavoriteFolderDialogContentProps
> = ({
  selectedFolderList,
  foldersEndCursor,
  onDialogClose,
  onSelectFolderList,
}) => {
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
      <SelectMultiFavoriteFolderList
        defaultSelectedFolderList={selectedFolderList}
        foldersEndCursor={foldersEndCursor}
        onSelectFolderList={handleSelectFolderList}
      />
    </DialogContent>
  );
};
