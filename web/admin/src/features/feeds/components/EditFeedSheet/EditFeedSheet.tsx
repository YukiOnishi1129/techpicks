"use client";

import { FC, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { FeedType } from "@/types/feed";

import { EditFeedSheetContent } from "./EditFeedSheetContent";

type EditFeedSheetProps = {
  feed: FeedType;
  offset?: number;
  keyword?: string;
  language?: string;
  platformId?: string;
  categoryId?: string;
  platformSiteType?: string;
  trendPlatformType?: string;
  status?: string;
};

export const EditFeedSheet: FC<EditFeedSheetProps> = ({
  feed,
  offset,
  keyword,
  language,
  platformId,
  categoryId,
  platformSiteType,
  trendPlatformType,
  status,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleSheetOpen = useCallback(() => setIsSheetOpen(true), []);
  const handleSheetClose = useCallback(() => setIsSheetOpen(false), []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button onClick={handleSheetOpen}>{"EDIT"}</Button>
      </SheetTrigger>
      {isSheetOpen && (
        <EditFeedSheetContent
          feed={feed}
          offset={offset}
          keyword={keyword}
          language={language}
          platformId={platformId}
          categoryId={categoryId}
          platformSiteType={platformSiteType}
          trendPlatformType={trendPlatformType}
          status={status}
          handleSheetClose={handleSheetClose}
        />
      )}
    </Sheet>
  );
};
