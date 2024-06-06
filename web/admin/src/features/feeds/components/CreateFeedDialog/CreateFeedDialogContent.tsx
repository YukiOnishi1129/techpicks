"use client";

import { FC } from "react";

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";

type CreateFeedDialogContentProps = {
  handleDialogClose: () => void;
};

export const CreateFeedDialogContent: FC<CreateFeedDialogContentProps> = ({
  handleDialogClose,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{"Add feed"}</DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
};
