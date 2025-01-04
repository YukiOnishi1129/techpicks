"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { SearchFavoriteArticleFolderDialogContent } from "./SearchFavoriteArticleFolderDialogContent";

type SearchFavoriteArticleFolderDialogProps = {
  keyword?: string;
};

export const SearchFavoriteArticleFolderDialog: FC<
  SearchFavoriteArticleFolderDialogProps
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
        <SearchFavoriteArticleFolderDialogContent
          keyword={keyword}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
