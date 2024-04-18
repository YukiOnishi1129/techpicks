"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { FcBookmark } from "react-icons/fc";
// import { uuid } from "uuidv4";

import { Button } from "@/components/ui/button";

import { ArticleType } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { ArticleDetailSheet } from "./ArticleDetailSheet";
import { AddBookmarkTooltip } from "./Tooltip/AddBookmarkTooptip";
import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleCardWrapperProps = {
  article: ArticleType;
  user: User | undefined;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  article,
  user,
}: ArticleCardWrapperProps) => {
  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  return (
    <div key={article.id} className="mb-4 rounded-2xl border-2 md:py-2">
      <ArticleDetailSheet article={article} user={user}>
        <ArticleCard article={article} user={user} />
      </ArticleDetailSheet>
      <div className="flex size-8 items-center justify-center rounded-full bg-white px-8 py-4">
        {user && (
          <div>
            {bookmarkId ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveBookmark(bookmarkId)}
              >
                <FcBookmark className="inline-block" size={36} />
              </Button>
            ) : (
              <AddBookmarkTooltip
                articleId={article.id}
                handleAddBookmark={handleAddBookmark}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
