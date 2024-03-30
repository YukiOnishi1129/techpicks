"use client";

import Link from "next/link";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

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
        <div className="flex justify-around">
          <div className="md:w-48 md:h-48 w-24 h-24  flex justify-center">
            <img
              className="h-full object-cover object-center rounded-lg border-2 shadow-md"
              src={imageUrl}
              alt=""
            />
          </div>

          <div className="w-[65%]">
            <h3 className="w-full h-18 font-bold md:text-2xl text-md line-clamp-3">
              {article.title}
            </h3>
            <div className="py-2">
              <span className="md:text-md text-xs font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
                {article.platform.name}
              </span>
            </div>
            {/* <div className="hidden md:inline-block"> */}
            {/* <div
                className="line-clamp-3"
                dangerouslySetInnerHTML={{ __html: article.description }}
              /> */}
            {/* <p className="line-clamp-3">{article.description}</p> */}
            {/* <div className="line-clamp-3">
                {parse(article.description, options)}
              </div> */}
            {/* </div> */}

            {/* <p>{formatDate(article.publishedAt)}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
