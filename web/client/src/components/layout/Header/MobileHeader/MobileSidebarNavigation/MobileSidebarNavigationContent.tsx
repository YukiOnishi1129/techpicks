"use client";

import { FC } from "react";

import { MobileSidebar } from "@/components/layout/Sidebar/MobileSidebar";
import { SheetContent } from "@/components/ui/sheet";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { MyFeedFolderType } from "@/types/myFeedFolder";

type MobileSidebarNavigationContentProps = {
  handleCloseSheet: () => void;
  myFeedFolders: Array<MyFeedFolderType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
};

export const MobileSidebarNavigationContent: FC<
  MobileSidebarNavigationContentProps
> = ({ handleCloseSheet, myFeedFolders, favoriteArticleFolders }) => {
  return (
    <SheetContent side={"left"}>
      <MobileSidebar
        myFeedFolders={myFeedFolders}
        favoriteArticleFolders={favoriteArticleFolders}
        handleCloseSheet={handleCloseSheet}
      />
    </SheetContent>
  );
};
