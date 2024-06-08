"use client";
import { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { PlatformType } from "@/types/platform";

import { EditPlatformSheetContent } from "./EditPlatformSheetContent";

type EditPlatformSheetProps = {
  platform: PlatformType;
  offset?: number;
  keyword?: string;
  language?: string;
  platformSiteType?: string;
  status?: string;
};

export const EditPlatformSheet: FC<EditPlatformSheetProps> = ({
  platform,
  offset,
  keyword,
  language,
  platformSiteType,
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
        <EditPlatformSheetContent
          platform={platform}
          offset={offset}
          keyword={keyword}
          language={language}
          platformSiteType={platformSiteType}
          status={status}
          handleSheetClose={handleSheetClose}
        />
      )}
    </Sheet>
  );
};
