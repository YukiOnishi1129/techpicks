"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { ArticleType } from "@/types/article";

type ArticleDetailProps = {
  article: ArticleType;
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80"
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
            <span className="rounded-lg bg-sky-500 px-2 py-1 text-sm font-bold text-white md:text-base">
              {article.platform.name}
            </span>
          </Link>
          <span className="pl-2 text-sm">
            {article.publishedAt.toDateString()}
          </span>
        </div>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(article.description)}</div>
        </div>

        <div className="my-10 text-center">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-1/2 bg-blue-700 text-xl hover:bg-blue-900"
            >
              続きを読む
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
