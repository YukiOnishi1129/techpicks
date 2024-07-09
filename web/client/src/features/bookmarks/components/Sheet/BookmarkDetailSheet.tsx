"use client";
import { User } from "@supabase/supabase-js";
import { FC, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { BookmarkType } from "@/types/bookmark";
import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { BookmarkDetailSheetContent } from "./BookmarkDetailSheetContent";

type BookmarkDetailSheetProps = {
  bookmark: BookmarkType;
  user: User | undefined;
  isFollowing: boolean;
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
  children: React.ReactNode;
};

export const BookmarkDetailSheet: FC<BookmarkDetailSheetProps> = ({
  bookmark,
  user,
  isFollowing,
  articleId,
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
  children,
}: BookmarkDetailSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div
          role="button"
          tabIndex={1}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(true);
            }
          }}
        >
          {children}
        </div>
      </SheetTrigger>
      <SheetContent className="w-[360px] sm:w-[700px] sm:max-w-[700px]">
        {open && (
          <BookmarkDetailSheetContent
            user={user}
            bookmark={bookmark}
            isFollowing={isFollowing}
            articleId={articleId}
            favoriteArticleFolders={favoriteArticleFolders}
            handleCreateFavoriteArticle={handleCreateFavoriteArticle}
            handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
            handleCreateFavoriteArticleFolder={
              handleCreateFavoriteArticleFolder
            }
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
