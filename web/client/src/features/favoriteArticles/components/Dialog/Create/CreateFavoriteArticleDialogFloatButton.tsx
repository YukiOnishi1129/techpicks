"use client";

import { User } from "@supabase/supabase-js";
import { useState, FC, useCallback } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
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
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          <HiPlus size={24} />
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
