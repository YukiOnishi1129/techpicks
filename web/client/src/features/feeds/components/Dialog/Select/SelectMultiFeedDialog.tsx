"use client";

import { VariantProps } from "class-variance-authority";
import { useState, useCallback, FC } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FeedType } from "@/types/feed";
import { SelectOptionType } from "@/types/util";

import { SelectMultiFeedDialogContent } from "./SelectMultiFeedDialogContent";

type SelectMultiFeedDialogProps = {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  feedList: Array<FeedType>;
  selectedFeedList?: Array<SelectOptionType>;
  handleSelectFeedList?: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedDialog: FC<SelectMultiFeedDialogProps> = ({
  label = "SELECT",
  variant,
  feedList,
  selectedFeedList,
  handleSelectFeedList,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className="font-bold"
          onClick={handleDialogOpen}
        >
          {label}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <SelectMultiFeedDialogContent
          feedList={feedList}
          selectedFeedList={selectedFeedList}
          handleDialogClose={handleDialogClose}
          handleSelectFeedList={handleSelectFeedList}
        />
      )}
    </Dialog>
  );
};
