"use client";

import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { CreateFavoriteArticleDialogContent } from "../CreateFavoriteArticleDialog/CreateFavoriteArticleDialogContent";

type CreateFavoriteArticleDialogFloatButtonProps = {
  favoriteArticleFolderId: string;
};

export const CreateFavoriteArticleDialogFloatButton: FC<
  CreateFavoriteArticleDialogFloatButtonProps
> = ({ favoriteArticleFolderId }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          <HiPlus size={24} />
        </Button>
      </DialogTrigger>
      {open && (
        <CreateFavoriteArticleDialogContent
          favoriteArticleFolderId={favoriteArticleFolderId}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
