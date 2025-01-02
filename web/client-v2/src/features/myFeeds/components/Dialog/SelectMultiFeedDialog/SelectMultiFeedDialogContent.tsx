"use client";

import { FC, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { SelectOptionType } from "@/types/utils";

import { SelectMultiFeedList } from "./SelectMultiFeedList";

type SelectMultiFeedDialogContentProps = {
  selectedFeedList?: Array<SelectOptionType>;
  onDialogClose: () => void;
  onSelectFeedList?: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedDialogContent: FC<
  SelectMultiFeedDialogContentProps
> = ({ selectedFeedList, onDialogClose, onSelectFeedList }) => {
  const handleSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      if (onSelectFeedList) onSelectFeedList(selectedFeedList);
      onDialogClose();
    },
    [onSelectFeedList, onDialogClose]
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select Feed"}</DialogTitle>
      </DialogHeader>
      <SelectMultiFeedList
        defaultSelectedFeedList={selectedFeedList}
        onSelectFeedList={handleSelectFeedList}
      />
    </DialogContent>
  );
};
