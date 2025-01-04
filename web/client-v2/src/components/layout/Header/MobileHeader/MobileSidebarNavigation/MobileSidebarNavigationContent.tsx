"use client";

import { FC } from "react";

// import { MobileSidebar } from "@/components/layout/Sidebar/MobileSidebar";
import { SheetContent } from "@/components/ui/sheet";

type MobileSidebarNavigationContentProps = {
  onCloseSheet: () => void;
};

export const MobileSidebarNavigationContent: FC<
  MobileSidebarNavigationContentProps
> = ({ onCloseSheet }) => {
  return (
    <SheetContent side={"left"}>
      {/* <MobileSidebar
        myFeedFolders={myFeedFolders}
        favoriteArticleFolders={favoriteArticleFolders}
        handleCloseSheet={handleCloseSheet}
      /> */}
    </SheetContent>
  );
};
