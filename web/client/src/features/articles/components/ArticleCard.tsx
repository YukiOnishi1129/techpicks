"use client";
import parse, { HTMLReactParserOptions } from "html-react-parser";
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

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      // @ts-ignore
      if (domNode.name === "img") return <></>;
      // @ts-ignore
      if (domNode.name === "strong") return <p></p>;
    },
  };

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
            <h3 className="w-full h-18 font-bold md:text-lg text-md line-clamp-3">
              {article.title}
            </h3>
            <div className="py-2">
              <span className="md:text-md text-xs font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
                {article.platform.name}
              </span>
            </div>
            <div className="hidden md:inline-block">
              <p className="line-clamp-3">
                {parse(article.description, options)}
              </p>
            </div>

            {/* <p>{formatDate(article.publishedAt)}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
