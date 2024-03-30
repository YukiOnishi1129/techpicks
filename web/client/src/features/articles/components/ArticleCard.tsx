"use client";

import Link from "next/link";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { Article } from "@/types/article";

import { ArticleDetailModal } from "./ArticleDetailModal";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  return (
    <div className="cursor-pointer relative w-full rounded hover:opacity-30">
      <ArticleDetailModal article={article} />
      <Link href={`/article/${article.id}`}>
        <div className="flex justify-around">
          <div className="w-[65%]">
            <h3 className="w-full h-18 pt-2 font-bold md:text-xl text-md tracking-wide line-clamp-3">
              {article.title}
            </h3>
            <div className="py-2">
              <span className="md:text-md text-xs font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
                {article.platform.name}
              </span>
              <p className="pt-2 text-sm">
                {showDiffDateToCurrentDate(article.publishedAt)}
              </p>
            </div>
          </div>

          <div className="md:w-48 md:h-32 w-24 h-16  flex justify-center">
            <img
              className="h-full object-cover object-center rounded-lg border-2 shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
