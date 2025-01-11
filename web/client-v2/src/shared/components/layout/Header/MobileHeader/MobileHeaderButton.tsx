"use client";

import { useParams } from "next/navigation";
import { FC, useMemo } from "react";

import { CreateBookmarkDialog } from "@/features/bookmarks/components/Dialog";
import {
  CreateFavoriteArticleFolderDialog,
  CreateFavoriteArticleDialogFloatButton,
  CreateMultiFolderFavoriteArticleDialog,
} from "@/features/favorites/components/Dialog";
import { CreateMyFeedFolderDialog } from "@/features/myFeeds/components/Dialog";

import { NAVIGATION_LISTS } from "@/shared/constant/navigation";

type MobileHeaderButtonProps = {
  pathname: string;
  foldersEndCursor?: string;
};

export const MobileHeaderButton: FC<MobileHeaderButtonProps> = ({
  pathname,
  foldersEndCursor,
}) => {
  const params = useParams();
  const targetId = params.id;

  const headerButton = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.BOOKMARK:
        return <CreateBookmarkDialog buttonVariant="ghost" />;
      case NAVIGATION_LISTS.MY_FEED_FOLDER:
        return <CreateMyFeedFolderDialog buttonVariant="ghost" />;
      case NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER:
        return <CreateFavoriteArticleFolderDialog buttonVariant="ghost" />;
      case NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER_ARTICLE:
        return (
          <CreateMultiFolderFavoriteArticleDialog
            buttonVariant="ghost"
            foldersEndCursor={foldersEndCursor}
          />
        );
      default:
        if (
          pathname.includes(NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER_ARTICLE) &&
          typeof targetId === "string"
        ) {
          return (
            <CreateFavoriteArticleDialogFloatButton
              favoriteArticleFolderId={targetId}
            />
          );
        }
        return <></>;
    }
  }, [pathname, targetId]);

  return <>{headerButton}</>;
};
