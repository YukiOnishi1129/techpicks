"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog/dialog";

import { CreateFavoriteArticleDialogContent } from "./CreateFavoriteArticleDialogContent";

type CreateFavoriteArticleDialogProps = {
  user?: User;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonSize?: number;
  favoriteArticleFolderId: string;
};

export const CreateFavoriteArticleDialog: FC<
  CreateFavoriteArticleDialogProps
> = ({ user, buttonVariant, buttonSize = 24, favoriteArticleFolderId }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <HiPlus size={buttonSize} />
          <span className="hidden pl-2 md:block">{"Add"}</span>
        </Button>
      </DialogTrigger>
      {open && (
        <CreateFavoriteArticleDialogContent
          user={user}
          favoriteArticleFolderId={favoriteArticleFolderId}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};
