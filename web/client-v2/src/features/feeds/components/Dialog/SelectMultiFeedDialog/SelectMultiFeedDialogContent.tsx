"use client";

import { FC, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFeedList } from "./SelectMultiFeedList";

type SelectMultiFeedDialogContentProps = {
  selectedFeedList?: Array<SelectOptionType>;
  feedsEndCursor?: string;
  onDialogClose: () => void;
  onSelectFeedList?: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedDialogContent: FC<
  SelectMultiFeedDialogContentProps
> = ({ selectedFeedList, feedsEndCursor, onDialogClose, onSelectFeedList }) => {
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
        feedsEndCursor={feedsEndCursor}
        onSelectFeedList={handleSelectFeedList}
      />
    </DialogContent>
  );
};
