"use client";

import { FC, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { FeedType } from "@/types/feed";

import { EditFeedSheetContent } from "./EditFeedSheetContent";

type EditFeedSheetProps = {
  feed: FeedType;
};

export const EditFeedSheet: FC<EditFeedSheetProps> = ({ feed }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleSheetOpen = useCallback(() => setIsSheetOpen(true), []);
  const handleSheetClose = useCallback(() => setIsSheetOpen(false), []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button onClick={handleSheetOpen}>{"EDIT"}</Button>
      </SheetTrigger>
      {isSheetOpen && (
        <EditFeedSheetContent feed={feed} handleSheetClose={handleSheetClose} />
      )}
    </Sheet>
  );
};
