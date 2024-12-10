"use client";
import { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { UpdateFavoriteArticleFolderDialogContent } from "./UpdateFavoriteArticleFolderDialogContent";

type UpdateFavoriteArticleFolderDialogProps = {
  favoriteArticleFolderId: string;
  title: string;
  description?: string;
  onUpdateFavoriteArticleFolder: ({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description?: string;
  }) => Promise<void>;
  onDeleteFavoriteArticleFolder: (id: string, title: string) => Promise<void>;
};

export const UpdateFavoriteArticleFolderDialog: FC<
  UpdateFavoriteArticleFolderDialogProps
> = ({
  favoriteArticleFolderId,
  title,
  description,
  onUpdateFavoriteArticleFolder,
  onDeleteFavoriteArticleFolder,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600 "
        >
          {"EDIT"}
        </Button>
      </DialogTrigger>
      {open && (
        <UpdateFavoriteArticleFolderDialogContent
          favoriteArticleFolderId={favoriteArticleFolderId}
          title={title}
          description={description}
          onUpdateFavoriteArticleFolder={onUpdateFavoriteArticleFolder}
          onDeleteFavoriteArticleFolder={onDeleteFavoriteArticleFolder}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
