"use client";

import { FC, useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FeedType } from "@/types/feed";

import { ArticleSearchDialogContent } from "./ArticleSearchDialogContent";

type ArticleSearchDialogProps = {
  keyword?: string;
  selectedFeedList?: Array<FeedType>;
  initialFeedList: Array<FeedType>;
};

export const ArticleSearchDialog: FC<ArticleSearchDialogProps> = ({
  keyword,
  selectedFeedList = [],
  initialFeedList,
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
        <ArticleSearchDialogContent
          keyword={keyword}
          selectedFeedList={selectedFeedList}
          initialFeedList={initialFeedList}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};
