"use client";

import { FC, useCallback, useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { DeleteFeedAlertDialogContent } from "./DeleteFeedAlertDialogContent";

type DeleteFeedAlertDialogProps = {
  feedId: string;
  feedTitle: string;
  disabled?: boolean;
};

export const DeleteFeedAlertDialog: FC<DeleteFeedAlertDialogProps> = ({
  feedId,
  feedTitle,
  disabled,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = useCallback(() => setIsDialogOpen(true), []);
  const handleDialogClose = useCallback(() => setIsDialogOpen(false), []);
  return (
    <AlertDialog onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={disabled}
          onClick={handleDialogOpen}
        >
          DELETE
        </Button>
      </AlertDialogTrigger>
      {isDialogOpen && (
        <DeleteFeedAlertDialogContent
          feedId={feedId}
          feedTitle={feedTitle}
          handleDialogClose={handleDialogClose}
        />
      )}
    </AlertDialog>
  );
};
