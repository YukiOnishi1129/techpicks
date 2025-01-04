"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FavoriteArticleFolderKeyWordSearchDialogContent } from "./FavoriteArticleFolderKeyWordSearchDialogContent";

type FavoriteArticleFolderKeyWordSearchDialogProps = {
  keyword?: string;
};

export const FavoriteArticleFolderKeyWordSearchDialog: FC<
  FavoriteArticleFolderKeyWordSearchDialogProps
> = ({ keyword }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4">
        <FaSearch size="24" color="black" />
      </DialogTrigger>
      {open && (
        <FavoriteArticleFolderKeyWordSearchDialogContent
          keyword={keyword}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
