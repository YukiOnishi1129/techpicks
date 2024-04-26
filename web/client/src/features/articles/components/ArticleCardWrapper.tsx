"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { ArticleTabType, ArticleType } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { ArticleDetailSheet } from "./ArticleDetailSheet";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "./Tooltip";
import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleCardWrapperProps = {
  article: ArticleType;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  article,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  return (
    <div key={article.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <ArticleDetailSheet article={article} user={user}>
        <ArticleCard article={article} user={user} tab={tab} />
      </ArticleDetailSheet>
      <div className="flex size-8 items-center justify-center rounded-full bg-white px-8 py-4">
        {user && (
          <>
            {bookmarkId ? (
              <DeleteBookmarkTooltip
                bookmarkId={bookmarkId}
                handleRemoveBookmark={handleRemoveBookmark}
              />
            ) : (
              <AddBookmarkTooltip
                articleId={article.id}
                handleAddBookmark={handleAddBookmark}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
