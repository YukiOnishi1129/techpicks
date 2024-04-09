"use client";

import { FC } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";

import { useCheckImageExist } from "@/hooks/useImage";

import { ArticleType } from "@/types/article";
import { showDiffDateToCurrentDate } from "@/lib/date";
import { useUser } from "@/features/users/hooks/useUser";

type ArticleCardProps = {
  article: ArticleType;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
}: ArticleCardProps) => {
  const { user } = useUser();
  const imageUrl = useCheckImageExist(article.thumbnailURL);
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
                {!article.isBookmarked && (
                  <MdOutlineBookmarkAdd className="inline-block" />
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
