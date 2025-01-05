"use client";

import { FC, useCallback, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";

import { MobileSidebarNavigationContent } from "./MobileSidebarNavigationContent";

type MobileSidebarNavigationProps = {};

export const MobileSidebarNavigation: FC<MobileSidebarNavigationProps> = () => {
  const [open, setOpen] = useState(false);

  const handleCloseSheet = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <HiOutlineMenuAlt2 size={36} />
      </SheetTrigger>

      {open && (
        <MobileSidebarNavigationContent onCloseSheet={handleCloseSheet} />
      )}
    </Sheet>
  );
};
