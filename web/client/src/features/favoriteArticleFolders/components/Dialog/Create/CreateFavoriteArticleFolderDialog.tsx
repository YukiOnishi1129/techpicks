"use client";

import { useState, useCallback, FC } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateFavoriteArticleFolderDialogContent } from "./CreateFavoriteArticleFolderDialogContent";

type CreateMyFeedFolderDialogProps = {
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  handleCreateFavoriteArticleFolder?: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

export const CreateFavoriteArticleFolderDialog: FC<
  CreateMyFeedFolderDialogProps
> = ({ buttonVariant, handleCreateFavoriteArticleFolder }) => {
  const [open, setOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{"Create folder"}</Button>
      </DialogTrigger>
      {open && (
        <CreateFavoriteArticleFolderDialogContent
          handleCloseDialog={handleCloseDialog}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        />
      )}
    </Dialog>
  );
};
