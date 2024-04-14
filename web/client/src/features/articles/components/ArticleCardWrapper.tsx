"use client";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { FcBookmark } from "react-icons/fc";
import { MdOutlineBookmarkAdd } from "react-icons/md";
// import { uuid } from "uuidv4";

import { Button } from "@/components/ui/button";

import { ArticleType } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { ArticleDetailSheet } from "./ArticleDetailSheet";
import { useArticleBookmark } from "../hooks/useBookmark";

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
    <div key={article.id} className="relative py-2">
      <div className="pb-12">
        <ArticleDetailSheet article={article} user={user}>
          <ArticleCard article={article} user={user} />
        </ArticleDetailSheet>
      </div>

      <div className="absolute right-5 top-0 flex size-8 items-center justify-center rounded-full bg-white py-8 md:right-12">
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddBookmark(article.id)}
              >
                <MdOutlineBookmarkAdd className="inline-block" size={36} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
