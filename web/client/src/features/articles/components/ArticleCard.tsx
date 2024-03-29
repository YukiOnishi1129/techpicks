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
    <div className="cursor-pointer w-full rounded hover:opacity-30">
      <Link href={article.articleUrl} target="_blank">
        <div className="grid grid-cols-2">
          <div className="w-[90%] h-48">
            <img
              className="h-full object-cover object-center rounded"
              src={imageUrl}
              alt=""
            />
          </div>
          <div>
            <div className="w-full h-1/4">
              <h3>{article.title}</h3>
            </div>
            <div>
              <p>{article.platform.name}</p>
            </div>
            <p>{formatDate(article.publishedAt)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
