"use client";

import { FC, useCallback, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";
import { MyFeedFolderType } from "@/types/myFeedFolder";

import { MobileSidebarNavigationContent } from "./MobileSidebarNavigationContent";

type MobileSidebarNavigationProps = {
  myFeedFolders: Array<MyFeedFolderType>;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
};

export const MobileSidebarNavigation: FC<MobileSidebarNavigationProps> = ({
  myFeedFolders,
  favoriteArticleFolders,
}) => {
  const [open, setOpen] = useState(false);

  const handleCloseSheet = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <HiOutlineMenuAlt2 className="mt-2" size={36} />
      </SheetTrigger>

      {open && (
        <MobileSidebarNavigationContent
          myFeedFolders={myFeedFolders}
          favoriteArticleFolders={favoriteArticleFolders}
          handleCloseSheet={handleCloseSheet}
        />
      )}
    </Sheet>
  );
};
