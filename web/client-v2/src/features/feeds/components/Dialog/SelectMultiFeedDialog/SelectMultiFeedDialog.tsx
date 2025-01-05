"use client";

import { VariantProps } from "class-variance-authority";
import { useState, useCallback, FC } from "react";

import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFeedDialogContent } from "./SelectMultiFeedDialogContent";

type SelectMultiFeedDialogProps = {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  selectedFeedList?: Array<SelectOptionType>;
  feedsEndCursor?: string;
  onSelectFeedList?: (selectedFeedList: Array<SelectOptionType>) => void;
};

export const SelectMultiFeedDialog: FC<SelectMultiFeedDialogProps> = ({
  label = "SELECT",
  variant,
  selectedFeedList,
  feedsEndCursor,
  onSelectFeedList,
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
          selectedFeedList={selectedFeedList}
          feedsEndCursor={feedsEndCursor}
          onDialogClose={handleDialogClose}
          onSelectFeedList={onSelectFeedList}
        />
      )}
    </Dialog>
  );
};
