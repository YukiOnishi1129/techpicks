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
    <div className="cursor-pointer border-2">
      <Link href={article.articleUrl} target="_blank">
        <div className="w-full h-48 border-2 ">
          <img
            className="w-full h-full object-cover object-center"
            src={imageUrl}
            alt=""
          />
        </div>
        <p>{formatDate(article.publishedAt)}</p>
        <p>{article.platform.name}</p>
        <div className="w-full h-1/4 border-2 ">
          <h3>{article.title}</h3>
        </div>
      </Link>
    </div>
  );
};
