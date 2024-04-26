"use client";

import { User } from "@supabase/supabase-js";
import { FC, useMemo } from "react";

import {
  FeedCategoryNameBadge,
  PlatformNameBadge,
} from "@/components/ui/badge";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { ArticleTabType, ArticleType } from "@/types/article";

type ArticleCardProps = {
  article: ArticleType;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
  user,
  tab,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);

  const isShowLikeCount = useMemo(
    () => tab === "trend" && article.likeCount !== undefined,
    [article.likeCount, tab]
  );

  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="flex justify-center md:w-[30%]">
          <div className="flex  w-full justify-center md:h-36 md:w-48">
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
            <div>
              <PlatformNameBadge name={article.platform.name} />
            </div>
          </div>

          <div className="ml-[32px] flex w-full flex-wrap pt-2">
            {article.feeds.length > 0 &&
              article.feeds.map((feed) => (
                <div
                  key={`${feed.id}-${feed.category.id}`}
                  className="mb-2 mr-2 "
                >
                  <FeedCategoryNameBadge name={feed.category.name} />
                </div>
              ))}
          </div>
          {isShowLikeCount && (
            <div className="flex size-6 items-center justify-center rounded-full text-2xl font-bold ">
              {article.likeCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
