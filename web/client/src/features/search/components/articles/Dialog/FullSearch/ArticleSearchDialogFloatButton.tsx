"use client";

import { FC, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FeedType } from "@/types/feed";

import { ArticleSearchDialogContent } from "./ArticleSearchDialogContent";

type ArticleSearchDialogFloatButtonProps = {
  keyword?: string;
  selectedFeedList?: Array<FeedType>;
  initialFeedList: Array<FeedType>;
};

export const ArticleSearchDialogFloatButton: FC<
  ArticleSearchDialogFloatButtonProps
> = ({ keyword, selectedFeedList = [], initialFeedList }) => {
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
