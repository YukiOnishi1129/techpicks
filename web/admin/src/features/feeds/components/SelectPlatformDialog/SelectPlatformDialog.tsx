"use strict";

import { useState, useCallback, FC } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { SelectPlatformDialogContent } from "./SelectPlatformDialogContent";

type SelectPlatformDialogProps = {};

export const SelectPlatformDialog: FC<SelectPlatformDialogProps> = ({}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="font-bold" onClick={handleDialogOpen}>
          {"SELECT"}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <SelectPlatformDialogContent handleDialogClose={handleDialogClose} />
      )}
    </Dialog>
  );
};
