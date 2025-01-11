"use client";

import { useState, useCallback, FC } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { CreateMultiFolderFavoriteArticleDialogContent } from "./CreateMultiFolderFavoriteArticleDialogContent";

type CreateMultiFolderFavoriteArticleDialogProps = {
  foldersEndCursor?: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize?: number;
};

export const CreateMultiFolderFavoriteArticleDialog: FC<
  CreateMultiFolderFavoriteArticleDialogProps
> = ({ foldersEndCursor, buttonVariant, buttonSize = 24 }) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <HiPlus size={buttonSize} />
          <span className="hidden pl-2 md:block">{"Create"}</span>
        </Button>
      </DialogTrigger>
      {open && (
        <CreateMultiFolderFavoriteArticleDialogContent
          foldersEndCursor={foldersEndCursor}
          onClose={handleCloseDialog}
        />
      )}
    </Dialog>
  );
};
