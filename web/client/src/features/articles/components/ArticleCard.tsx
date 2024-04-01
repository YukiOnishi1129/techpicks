"use client";

import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { Article } from "@/types/article";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  return (
    <div className="relative w-full cursor-pointer rounded hover:opacity-30">
      <div className="flex justify-around">
        <div className="w-[65%]">
          <h3 className="line-clamp-3 h-16 w-full pt-2 text-lg font-bold  tracking-wide md:text-xl">
            {article.title}
          </h3>
          <div className="py-2">
            <img
              className="mr-2 inline-block size-[24px]"
              src={article.platform.faviconUrl}
              alt=""
            />
            <span className="rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {article.platform.name}
            </span>
            {article.platform.categoryName && (
              <span className="ml-2 rounded-lg bg-yellow-600 px-2 py-1 text-xs font-bold text-white md:text-base">
                {article.platform.categoryName}
              </span>
            )}
            <p className="pt-2 text-sm">
              {showDiffDateToCurrentDate(article.publishedAt)}
            </p>
          </div>
        </div>

        <div className="flex h-16 w-24 justify-center  md:h-32 md:w-48">
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
