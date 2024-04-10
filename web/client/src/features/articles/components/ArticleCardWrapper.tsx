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
import { ArticleDetailDialog } from "./ArticleDetailDialog";

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
    <div key={article.id} className="relative border-t-2 py-8">
      <ArticleDetailDialog article={article} user={user}>
        <ArticleCard article={article} user={user} />
      </ArticleDetailDialog>
      <div className="absolute bottom-0 left-0 flex size-8 items-center justify-center rounded-full bg-white">
        {user && (
          <div>
            {bookmarkId ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveBookmark(bookmarkId)}
              >
                <FcBookmark className="inline-block" size={36} />
              </Button>
            ) : (
              <Button variant="outline" size="icon" onClick={handleAddBookmark}>
                <MdOutlineBookmarkAdd className="inline-block" size={36} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
