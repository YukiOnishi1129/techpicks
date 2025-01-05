"use client";

import { FC } from "react";

import { MobileSidebar } from "@/shared/components/layout/Sidebar";
import { SheetContent } from "@/shared/components/ui/sheet";

type MobileSidebarNavigationContentProps = {
  onCloseSheet: () => void;
};

export const MobileSidebarNavigationContent: FC<
  MobileSidebarNavigationContentProps
> = ({ onCloseSheet }) => {
  return (
    <SheetContent side={"left"}>
      <MobileSidebar onCloseSheet={onCloseSheet} />
    </SheetContent>
  );
};
