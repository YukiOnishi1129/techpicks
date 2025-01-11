"use client";

import { VariantProps } from "class-variance-authority";
import { useState, useCallback, FC } from "react";

import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

import { SelectMultiFavoriteFolderDialogContent } from "./SelectMultiFavoriteFolderDialogContent";

type SelectMultiFavoriteFolderDialogProps = {
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  selectedFolderList?: Array<SelectOptionType>;
  onSelectFolderList?: (selectedFolderList: Array<SelectOptionType>) => void;
};

export const SelectMultiFavoriteFolderDialog: FC<
  SelectMultiFavoriteFolderDialogProps
> = ({ label = "SELECT", variant, selectedFolderList, onSelectFolderList }) => {
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
        <SelectMultiFavoriteFolderDialogContent
          selectedFolderList={selectedFolderList}
          onDialogClose={handleDialogClose}
          onSelectFolderList={onSelectFolderList}
        />
      )}
    </Dialog>
  );
};
