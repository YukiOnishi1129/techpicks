"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FC, useState } from "react";
import { FcBookmark } from "react-icons/fc";
import { MdOutlineBookmarkAdd } from "react-icons/md";

import { FeedNameBadge } from "@/components/ui/badge/FeedNameBadge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { ArticleType } from "@/types/article";

import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleDetailSheetProps = {
  article: ArticleType;
  user: User | undefined;
  children: React.ReactNode;
};

export const ArticleDetailSheet: FC<ArticleDetailSheetProps> = ({
  article,
  user,
  children,
}: ArticleDetailSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div
          role="button"
          tabIndex={1}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(true);
            }
          }}
        >
          {children}
        </div>
      </SheetTrigger>
      <SheetContent className="w-[360px] sm:w-[700px] sm:max-w-[700px]">
        {open && <ArticleContent article={article} user={user} />}
      </SheetContent>
    </Sheet>
  );
};

const ArticleContent = ({
  article,
  user,
}: {
  article: ArticleType;
  user: User | undefined;
}) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  const { convertParseHtml } = useParseHtml();
  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="flex">
          <Link
            className="inline-block w-full cursor-pointer  text-lg font-semibold tracking-wide hover:text-blue-500"
            href={article.articleUrl}
            target="_blank"
          >
            <span className="pb-4">{article.title}</span>
          </Link>
        </SheetTitle>

        <p className="pl-2 text-sm">
          {showDiffDateToCurrentDate(article.publishedAt)}
        </p>

        <div className="flex w-full items-center justify-between pt-2">
          <Link
            className="mb-2 hover:opacity-80"
            href={article.platform?.siteUrl || ""}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[36px]"
              src={article.platform?.faviconUrl || ""}
              alt=""
            />
          </Link>
          {user && (
            <div className="flex justify-end">
              {bookmarkId ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveBookmark(bookmarkId)}
                >
                  <FcBookmark className="inline-block" size={36} />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleAddBookmark(article.id)}
                >
                  <MdOutlineBookmarkAdd className="inline-block" size={36} />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="my-10 flex justify-around">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <div className="h-[400px] overflow-y-scroll md:h-[400px]">
        <Link href={article.articleUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80 md:h-[370px]"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(article.description)}</div>
        </div>

        <div className="flex flex-wrap justify-start pb-0">
          {article.feeds.length > 0 &&
            article.feeds.map((feed) => (
              <Link
                key={`${feed.id}-${feed.category.id}`}
                className="mb-2 ml-2 hover:opacity-80"
                href={feed.siteUrl}
                target="_blank"
              >
                <FeedNameBadge name={feed.name} />
              </Link>
            ))}
        </div>

        <div className="my-10 flex justify-around">
          <Link href={article.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </div>

      {/* <SheetFooter className="mt-8">
        <SheetClose asChild>
          <Button variant="outline" className=" inline-block w-1/2 text-xl ">
            CLOSE
          </Button>
        </SheetClose>
      </SheetFooter> */}
    </>
  );
};
