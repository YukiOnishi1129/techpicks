"use client";

import { User } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { FC, useMemo } from "react";

import { CreateBookmarkDialog } from "@/features/bookmarks/components/Dialog";
import { CreateFavoriteArticleFolderDialog } from "@/features/favoriteArticleFolders/components/Dialog";
import { CreateFavoriteArticleDialogFloatButton } from "@/features/favoriteArticles/components/Dialog";
import { CreateMyFeedFolderDialog } from "@/features/myFeedFolders/components/Dialog";

import { NAVIGATION_LISTS } from "@/constant/navigation";

type MobileHeaderButtonProps = {
  user?: User;
  pathname: string;
};

export const MobileHeaderButton: FC<MobileHeaderButtonProps> = ({
  user,
  pathname,
}) => {
  const params = useParams();
  const targetId = params.id;

  const headerButton = useMemo(() => {
    switch (pathname) {
      case NAVIGATION_LISTS.BOOKMARK:
        return <CreateBookmarkDialog buttonVariant="ghost" user={user} />;
      case NAVIGATION_LISTS.MY_FEED_FOLDER:
        return <CreateMyFeedFolderDialog buttonVariant="ghost" />;
      case NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER:
        return <CreateFavoriteArticleFolderDialog buttonVariant="ghost" />;
      default:
        if (
          pathname.includes(NAVIGATION_LISTS.FAVORITE_ARTICLE_FOLDER) &&
          typeof targetId === "string"
        ) {
          return (
            <CreateFavoriteArticleDialogFloatButton
              user={user}
              favoriteArticleFolderId={targetId}
            />
          );
        }
        return <></>;
    }
  }, [pathname, user, targetId]);

  return <>{headerButton}</>;
};
