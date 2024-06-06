"use client";

import { useState, useCallback } from "react";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateFeedDialogContent } from "./CreateFeedDialogContent";

export const CreateFeedDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = useCallback(() => setOpenDialog(true), []);
  const handleDialogClose = useCallback(() => setOpenDialog(false), []);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="font-bold" onClick={handleDialogOpen}>
          <FiPlus className="mr-2" />
          {"ADD"}
        </Button>
      </DialogTrigger>
      {openDialog && (
        <CreateFeedDialogContent handleDialogClose={handleDialogClose} />
      )}
    </Dialog>
  );
};
