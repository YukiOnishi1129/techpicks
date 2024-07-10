"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateFavoriteArticleDialogContent } from "./CreateFavoriteArticleDialogContent";

type CreateFavoriteArticleDialogProps = {
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  user: User | undefined;
  favoriteArticleFolderId: string;
};

export const CreateFavoriteArticleDialog: FC<
  CreateFavoriteArticleDialogProps
> = ({ buttonVariant, user, favoriteArticleFolderId }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <HiPlus size={24} />
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
