"use client";

import { FC, useCallback, useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeleteFeedAlertDialogProps = {
  feedId: string;
  feedTitle: string;
  disabled?: boolean;
  handleDelete: () => void;
};

export const DeleteFeedAlertDialog: FC<DeleteFeedAlertDialogProps> = ({
  feedId,
  feedTitle,
  disabled,
  handleDelete,
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
      {/* {isDialogOpen && (
        <DeletePlatformAlertDialogContent
          platformId={platformId}
          platformTitle={platformTitle}
          handleDialogClose={handleDialogClose}
          handleDelete={handleDelete}
        />
      )} */}
    </AlertDialog>
  );
};
