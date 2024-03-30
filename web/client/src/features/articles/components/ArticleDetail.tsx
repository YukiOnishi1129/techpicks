"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { Article } from "@/types/article";

type ArticleDetailProps = {
  article: Article;
};

export const ArticleDetail = ({ article }: ArticleDetailProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  const { convertParseHtml } = useParseHtml();

  return (
    <div>
      <div className="my-4">
        <Link className="hover:text-blue-500" href="/">
          &lt;&lt;戻る
        </Link>
      </div>

      <div>
        <img
          className="m-auto h-[370px] pb-8 rounded-md object-cover object-center"
          src={imageUrl}
          alt=""
        />

        <h1 className="text-xl font-semibold pb-2 tracking-wide">
          {article.title}
        </h1>
        <div className="pb-2">
          <Link href={article.platform.siteUrl} target="_blank">
            <span className="md:text-md text-xs font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
              {article.platform.name}
            </span>
          </Link>
          <span className="pl-2 text-sm">
            {showDiffDateToCurrentDate(article.publishedAt)}
          </span>
        </div>

        <div className="">
          <div>{convertParseHtml(article.description)}</div>
        </div>

        <div className="my-10 text-center">
          <Link href={article.articleUrl} target="_blank">
            <Button size={"lg"}>続きを読む</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
