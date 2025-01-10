"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { SelectOptionType } from "@/shared/types/utils";

import { SearchDetailArticleDialogContent } from "../SearchDetailArticleDialog/SearchDetailArticleDialogContent";

type SearchDetailArticleDialogFloatButtonProps = {
  keywordList: Array<string>;
  selectedFeedList: Array<SelectOptionType>;
  feedsEndCursor?: string;
};

export const SearchDetailArticleDialogFloatButton: FC<
  SearchDetailArticleDialogFloatButtonProps
> = ({ keywordList, selectedFeedList = [], feedsEndCursor }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer rounded-full bg-primary p-4 shadow-lg">
        <FaSearch size="24" color="black" />
      </DialogTrigger>
      {open && (
        <SearchDetailArticleDialogContent
          keywordList={keywordList}
          selectedFeedList={selectedFeedList}
          feedsEndCursor={feedsEndCursor}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
