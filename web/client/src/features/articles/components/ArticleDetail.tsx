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
        <Link href={article.articleUrl} target="_blank">
          <img
            className="cursor-pointer m-auto h-[370px] pb-8 rounded-md object-cover object-center hover:opacity-80"
            src={imageUrl}
            alt=""
          />
        </Link>

        <Link
          className="cursor-pointer text-2xl font-semibold  tracking-wide hover:text-blue-500"
          href={article.articleUrl}
          target="_blank"
        >
          <h1 className="pb-4">{article.title}</h1>
        </Link>

        <div className="pb-8">
          <Link
            className="hover:opacity-80"
            href={article.platform.siteUrl}
            target="_blank"
          >
            <span className="md:text-basic text-sm font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
              {article.platform.name}
            </span>
          </Link>
          <span className="pl-2 text-sm">
            {showDiffDateToCurrentDate(article.publishedAt)}
          </span>
        </div>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(article.description)}</div>
        </div>

        <div className="my-10 text-center">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="bg-blue-700 text-xl w-[50%] hover:bg-blue-900"
            >
              続きを読む
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
