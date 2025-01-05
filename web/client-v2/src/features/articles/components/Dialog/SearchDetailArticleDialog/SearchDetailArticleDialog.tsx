"use client";

import { FC, useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { SelectOptionType } from "@/types/utils";

import { SearchDetailArticleDialogContent } from "./SearchDetailArticleDialogContent";

type SearchDetailArticleDialogProps = {
  keyword?: string;
  selectedFeedList: Array<SelectOptionType>;
  feedsEndCursor?: string;
};

export const SearchDetailArticleDialog: FC<SearchDetailArticleDialogProps> = ({
  keyword,
  selectedFeedList = [],
  feedsEndCursor,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <CiSearch size="36" />
      </DialogTrigger>
      {open && (
        <SearchDetailArticleDialogContent
          keyword={keyword}
          selectedFeedList={selectedFeedList}
          feedsEndCursor={feedsEndCursor}
          onClose={handleClose}
        />
      )}
    </Dialog>
  );
};
