"use client";

import { FC } from "react";

import { SheetContent } from "@/components/ui/sheet";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { MobileSidebar } from "../../Sidebar";

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
