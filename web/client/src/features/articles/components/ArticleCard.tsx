"use client";

import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { ArticleType } from "@/types/article";

type ArticleCardProps = {
  article: ArticleType;
  user: User | undefined;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
  user,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);

  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="flex justify-center md:w-[30%]">
          <div className="w-full  md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full rounded-lg border-2 object-cover object-center shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3 text-left text-lg font-bold tracking-wide md:w-full md:text-xl">
            {article.title}
          </h3>

          <p className="flex pt-2 text-sm">
            {showDiffDateToCurrentDate(article.publishedAt)}
          </p>

          <div className="flex w-full items-center pt-2 md:w-4/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={article.platform.faviconUrl}
              alt=""
            />
            <p className="inline-block rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {article.platform.name}
            </p>
          </div>

          <div className="ml-[32px] flex w-full flex-wrap pt-2">
            {article.feeds.length > 0 &&
              article.feeds.map((feed) => (
                <p
                  key={`${feed.id}-${feed.category.id}`}
                  className="mb-2 mr-2 inline-block rounded-lg bg-yellow-600 px-2 py-1 text-xs font-bold text-white md:text-base"
                >
                  {feed.category.name}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
