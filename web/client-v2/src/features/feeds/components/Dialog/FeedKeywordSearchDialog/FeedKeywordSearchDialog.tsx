"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";

import { FeedKeywordSearchDialogContent } from "./FeedKeywordSearchDialogContent";

type FeedKeywordSearchDialogProps = {
  keywordList: Array<string>;
};

export const FeedKeywordSearchDialog: FC<FeedKeywordSearchDialogProps> = ({
  keywordList,
}) => {
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
        <FeedKeywordSearchDialogContent
          keywordList={keywordList}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};
