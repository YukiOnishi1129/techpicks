"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback, useState } from "react";
import { FcBookmark } from "react-icons/fc";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { uuid } from "uuidv4";

import {
  createBookmark,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";

import { Button } from "@/components/ui/button";

import { ArticleType } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import { ArticleDetailSheet } from "./ArticleDetailSheet";

type ArticleCardWrapperProps = {
  article: ArticleType;
  user: User | undefined;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  article,
  user,
}: ArticleCardWrapperProps) => {
  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );
  const handleAddBookmark = useCallback(async () => {
    if (!user) return;
    const uniqueId = uuid();
    const id = await createBookmark({
      id: uniqueId,
      title: article.title,
      description: article.description,
      articleId: article.id,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      thumbnailURL: article.thumbnailURL,
      isRead: false,
      userId: user.id,
      platformId: article.platform.id,
    });
    setBookmarkId(id);
  }, [article, user]);

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      if (!user || !bookmarkId) return;
      await deleteBookmark({
        bookmarkId: bookmarkId,
        userId: user.id,
      });
      setBookmarkId(undefined);
    },
    [user]
  );

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
              <Button variant="ghost" size="icon" onClick={handleAddBookmark}>
                <MdOutlineBookmarkAdd className="inline-block" size={36} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
