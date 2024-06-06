"use client";
import { useState, useCallback } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { DeletePlatformAlertDialogContent } from "./DeletePlatformAlertDialogContent";

type DeletePlatformAlertDialogProps = {
  platformId: string;
  platformTitle: string;
  disabled?: boolean;
};

export const DeletePlatformAlertDialog = ({
  platformId,
  platformTitle,
  disabled,
}: DeletePlatformAlertDialogProps) => {
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
        <DeletePlatformAlertDialogContent
          platformId={platformId}
          platformTitle={platformTitle}
          handleDialogClose={handleDialogClose}
        />
      )}
    </AlertDialog>
  );
};
