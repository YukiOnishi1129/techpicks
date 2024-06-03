"use strict";

import { useState, useCallback, FC } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { PlatformType } from "@/types/platform";

import { SelectPlatformDialogContent } from "./SelectPlatformDialogContent";

type SelectPlatformDialogProps = {
  selectedPlatform?: PlatformType;
};

export const SelectPlatformDialog: FC<SelectPlatformDialogProps> = ({
  selectedPlatform,
}) => {
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
        <SelectPlatformDialogContent
          handleDialogClose={handleDialogClose}
          selectedPlatform={selectedPlatform}
        />
      )}
    </Dialog>
  );
};
