"use client";
import { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { PlatformType } from "@/types/platform";

import { EditPlatformSheetContent } from "./EditPlatformSheetContent";

type EditPlatformSheetProps = {
  platform: PlatformType;
};

export const EditPlatformSheet: FC<EditPlatformSheetProps> = ({ platform }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleSheetOpen = useCallback(() => setIsSheetOpen(true), []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={handleSheetOpen}>
          {"EDIT"}
        </Button>
      </SheetTrigger>
      {isSheetOpen && <EditPlatformSheetContent platform={platform} />}
    </Sheet>
  );
};
