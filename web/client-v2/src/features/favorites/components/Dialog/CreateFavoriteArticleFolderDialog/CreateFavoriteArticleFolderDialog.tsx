"use client";

import { useState, useCallback, FC } from "react";
import { HiPlus } from "react-icons/hi";

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
  buttonSize?: number;
  handleCreateFavoriteArticleFolder?: (
    favoriteArticleFolderId: string,
    title: string
  ) => Promise<void>;
};

export const CreateFavoriteArticleFolderDialog: FC<
  CreateMyFeedFolderDialogProps
> = ({ buttonVariant, buttonSize = 24, handleCreateFavoriteArticleFolder }) => {
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
        <CreateFavoriteArticleFolderDialogContent
          handleCloseDialog={handleCloseDialog}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        />
      )}
    </Dialog>
  );
};
