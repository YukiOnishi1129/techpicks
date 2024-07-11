"use client";

import { FC, useCallback } from "react";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

import { FeedType } from "@/types/feed";
import { SelectOptionType } from "@/types/util";

import { SelectMultiFeedList } from "./SelectMultiFeedList";

type SelectMultiFeedDialogContentProps = {
  feedList: Array<FeedType>;
  selectedFeedList?: Array<SelectOptionType>;
  handleDialogClose: () => void;
  handleSelectFeedList?: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedDialogContent: FC<
  SelectMultiFeedDialogContentProps
> = ({
  feedList,
  selectedFeedList,
  handleDialogClose,
  handleSelectFeedList,
}) => {
  const onSelectFeedList = useCallback(
    (selectedFeedList: Array<SelectOptionType>) => {
      if (handleSelectFeedList) handleSelectFeedList(selectedFeedList);
      handleDialogClose();
    },
    [handleSelectFeedList, handleDialogClose]
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Select Feed"}</DialogTitle>
      </DialogHeader>
      {feedList.length > 0 && (
        <SelectMultiFeedList
          defaultSelectedFeedList={selectedFeedList}
          initialFeedList={feedList}
          onSelectFeedList={onSelectFeedList}
        />
      )}
    </DialogContent>
  );
};
