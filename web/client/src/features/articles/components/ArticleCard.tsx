"use client";

import Link from "next/link";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";
import { formatDate } from "@/lib/date";
import { Article } from "@/types/article";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
}: ArticleCardProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);

  return (
    <div className="cursor-pointer relative w-full rounded hover:opacity-30">
      <Link href={article.articleUrl} target="_blank">
        <div className="grid grid-cols-2">
          <div className="w-[90%] h-48 flex justify-center">
            <img
              className="h-full object-cover object-center rounded border-2 shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>
          <div>
            <div className="w-full h-1/4 mb-4 line-clamp-3">
              <h3 className="font-bold text-lg">{article.title}</h3>
            </div>
            <div className="py-2">
              <span className="px-2 py-1 rounded-lg text-white bg-sky-500">
                {article.platform.name}
              </span>
            </div>
            <p>{formatDate(article.publishedAt)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
