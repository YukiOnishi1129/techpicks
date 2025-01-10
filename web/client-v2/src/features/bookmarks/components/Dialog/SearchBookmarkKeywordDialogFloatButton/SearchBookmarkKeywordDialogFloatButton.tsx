"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { SearchBookmarkKeywordDialogContent } from "./SearchBookmarkKeywordDialogContent";

type SearchBookmarkKeywordDialogFloatButtonProps = {
  keywordList: Array<string>;
};

export const SearchBookmarkKeywordDialogFloatButton: FC<
  SearchBookmarkKeywordDialogFloatButtonProps
> = ({ keywordList }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full border-2 border-white bg-primary p-4 shadow-lg">
        <FaSearch size="24" color="black" />
      </DialogTrigger>
      {open && (
        <SearchBookmarkKeywordDialogContent
          keywordList={keywordList}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
