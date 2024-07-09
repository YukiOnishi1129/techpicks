"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { CreateFavoriteArticleDialogContent } from "./CreateFavoriteArticleDialogContent";

type CreateFavoriteArticleDialogFloatButtonProps = {
  user: User | undefined;
  favoriteArticleFolderId: string;
};

export const CreateFavoriteArticleDialogFloatButton: FC<
  CreateFavoriteArticleDialogFloatButtonProps
> = ({ user, favoriteArticleFolderId }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4">
        <HiPlus size="24" color="black" />
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
