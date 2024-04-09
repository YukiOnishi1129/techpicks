"use client";

import { FC, useCallback } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FcBookmark } from "react-icons/fc";

import { useCheckImageExist } from "@/hooks/useImage";

import { ArticleType } from "@/types/article";
import { showDiffDateToCurrentDate } from "@/lib/date";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  createBookmark,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";

type ArticleCardProps = {
  article: ArticleType;
  user: User | undefined;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
  user,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);

  const handleAddBookmark = useCallback(async () => {
    if (!user || !article?.bookmarkId) return;
    await createBookmark({
      title: article.title,
      description: article.description,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      thumbnailURL: article.thumbnailURL,
      isRead: false,
      userId: user.id,
      platformId: article.platform.id,
    });
  }, []);

  const handleRemoveBookmark = useCallback(async () => {
    if (!user || !article?.bookmarkId) return;
    await deleteBookmark({
      bookmarkId: article.bookmarkId,
      userId: user.id,
    });
  }, []);

  return (
    <div className="relative w-full cursor-pointer rounded hover:opacity-30">
      <div className="flex justify-around">
        <div className="w-[65%]">
          <h3 className="line-clamp-3 h-16 w-full pt-2 text-lg font-bold  tracking-wide md:text-xl">
            {article.title}
          </h3>
          <div className="py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={article.platform.faviconUrl}
              alt=""
            />
            <span className="rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {article.platform.name}
            </span>
            {article.feeds.length > 0 &&
              article.feeds.map((feed) => (
                <span
                  key={`${feed.id}-${feed.category.id}`}
                  className="ml-2 rounded-lg bg-yellow-600 px-2 py-1 text-xs font-bold text-white md:text-base"
                >
                  {feed.category.name}
                </span>
              ))}
            <p className="pt-2 text-sm">
              {showDiffDateToCurrentDate(article.publishedAt)}
            </p>
            {user && (
              <div>
                {article.isBookmarked ? (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRemoveBookmark}
                  >
                    <FcBookmark className="inline-block" size={36} />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleAddBookmark}
                  >
                    <MdOutlineBookmarkAdd className="inline-block" size={36} />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex h-16 w-24 justify-center  md:h-32 md:w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-full rounded-lg border-2 object-cover object-center shadow-md"
            src={imageUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
