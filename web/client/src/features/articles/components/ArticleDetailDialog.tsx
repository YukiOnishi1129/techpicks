"use client";
import Link from "next/link";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { Article } from "@/types/article";

type ArticleDetailDialogProps = {
  article: Article;
  children: React.ReactNode;
};

export const ArticleDetailDialog: FC<ArticleDetailDialogProps> = ({
  article,
  children,
}: ArticleDetailDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="reset"
          variant="ghost"
          className="p-0 block w-full h-full text-basic whitespace-normal text-left"
          onClick={() => setOpen(true)}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-h-[70%] sm:max-h-[90%] overflow-hidden">
        {open && <ArticleContent article={article} />}
      </DialogContent>
    </Dialog>
  );
};

const ArticleContent = ({ article }: { article: Article }) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  const { convertParseHtml } = useParseHtml();
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Link
            className="cursor-pointer text-lg font-semibold  tracking-wide hover:text-blue-500"
            href={article.articleUrl}
            target="_blank"
          >
            <h1 className="pb-4">{article.title}</h1>
          </Link>
        </DialogTitle>
        <DialogDescription>
          <div className="pb-0">
            <Link
              className="hover:opacity-80"
              href={article.platform.siteUrl}
              target="_blank"
            >
              <img
                className="w-[24px] h-[24px] inline-block mr-2"
                src={article.platform.faviconUrl}
                alt=""
              />
              <span className="md:text-basic text-xs font-bold px-2 py-1 rounded-lg text-white bg-sky-500">
                {article.platform.name}
              </span>
              {article.platform.categoryName && (
                <span className="md:text-md text-xs font-bold ml-2 px-2 py-1 rounded-lg text-white bg-yellow-600">
                  {article.platform.categoryName}
                </span>
              )}
            </Link>

            <span className="pl-2 text-sm">
              {showDiffDateToCurrentDate(article.publishedAt)}
            </span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="overflow-y-scroll">
        <Link href={article.articleUrl} target="_blank">
          <img
            className="cursor-pointer m-auto h-[370px] pb-8 rounded-md object-cover object-center hover:opacity-80"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="my-10 text-center">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="bg-blue-700 text-xl w-[50%] hover:bg-blue-900"
            >
              本文を読む
            </Button>
          </Link>
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
              本文を読む
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
