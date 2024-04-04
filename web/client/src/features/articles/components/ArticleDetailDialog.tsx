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

import { ArticleType } from "@/types/article";

type ArticleDetailDialogProps = {
  article: ArticleType;
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
          className="block size-full whitespace-normal p-0 text-left text-base"
          onClick={() => setOpen(true)}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[70%] w-[90%] overflow-hidden sm:max-h-[90%]">
        {open && <ArticleContent article={article} />}
      </DialogContent>
    </Dialog>
  );
};

const ArticleContent = ({ article }: { article: ArticleType }) => {
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
                className="mr-2 inline-block size-[24px]"
                src={article.platform.faviconUrl}
                alt=""
              />
            </Link>
            <Link
              className="hover:opacity-80"
              href={article.platform.siteUrl}
              target="_blank"
            >
              <span className="rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
                {article.platform.name}
              </span>
            </Link>

            {article.feeds.length > 0 &&
              article.feeds.map((feed) => (
                <Link
                  key={`${feed.id}-${feed.category.id}`}
                  className="ml-2 hover:opacity-80"
                  href={feed.siteUrl}
                  target="_blank"
                >
                  <span className="rounded-lg bg-yellow-600 px-2 py-1 text-xs font-bold text-white md:text-base">
                    {feed.category.name}
                  </span>
                </Link>
              ))}

            <span className="pl-2 text-sm">
              {article.publishedAt.toString()}
            </span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="overflow-y-scroll">
        <Link href={article.articleUrl} target="_blank">
          <img
            className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="my-10 text-center">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-1/2 bg-blue-700 text-xl hover:bg-blue-900"
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
              className="w-1/2 bg-blue-700 text-xl hover:bg-blue-900"
            >
              本文を読む
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
