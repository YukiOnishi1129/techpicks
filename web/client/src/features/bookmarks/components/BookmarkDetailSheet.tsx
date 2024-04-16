"use client";
import Link from "next/link";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { formatShowDateTime } from "@/lib/date";

import { BookmarkType } from "@/types/bookmark";

type BookmarkDetailSheetProps = {
  bookmark: BookmarkType;
  children: React.ReactNode;
};

export const BookmarkDetailSheet: FC<BookmarkDetailSheetProps> = ({
  bookmark,
  children,
}: BookmarkDetailSheetProps) => {
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
      <SheetContent>
        {open && <BookmarkContent bookmark={bookmark} />}
      </SheetContent>
    </Sheet>
  );
};

const BookmarkContent = ({ bookmark }: { bookmark: BookmarkType }) => {
  const imageUrl = useCheckImageExist(bookmark.thumbnailURL);
  const { convertParseHtml } = useParseHtml();

  return (
    <>
      <SheetHeader>
        <SheetTitle>
          <Link
            className="cursor-pointer text-lg font-semibold  tracking-wide hover:text-blue-500"
            href={bookmark.articleUrl}
            target="_blank"
          >
            <h1 className="pb-4">{bookmark.title}</h1>
          </Link>
        </SheetTitle>
        <div className="pb-0">
          <Link
            className="hover:opacity-80"
            href={bookmark?.platformUrl || ""}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={bookmark?.platformFaviconUrl || ""}
              alt=""
            />
          </Link>
          <Link
            className="hover:opacity-80"
            href={bookmark?.platformUrl || ""}
            target="_blank"
          >
            <span className="rounded-lg bg-sky-500 px-2 py-1 text-xs font-bold text-white md:text-base">
              {bookmark?.platformName || ""}
            </span>
          </Link>

          <span className="pl-2 text-sm">
            {formatShowDateTime(bookmark.publishedAt)}
          </span>
        </div>

        <div className="h-[600px] overflow-y-scroll md:h-[500px]">
          <Link href={bookmark.articleUrl} target="_blank">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80"
              src={imageUrl}
              alt=""
            />
          </Link>

          <div className="my-10 text-center">
            <Link href={bookmark.articleUrl} target="_blank">
              <Button
                size={"lg"}
                className="w-1/2 bg-blue-700 text-xl hover:bg-blue-900"
              >
                本文を読む
              </Button>
            </Link>
          </div>

          <div className="text-lg tracking-wide">
            <div>{convertParseHtml(bookmark.description)}</div>
          </div>

          <div className="my-10 text-center">
            <Link href={bookmark.articleUrl} target="_blank">
              <Button
                size={"lg"}
                className="w-1/2 bg-blue-700 text-xl hover:bg-blue-900"
              >
                本文を読む
              </Button>
            </Link>
          </div>
        </div>
      </SheetHeader>
      <SheetFooter className="mt-8">
        <SheetClose asChild>
          <Button
            variant="outline"
            className=" inline-block w-1/2 text-xl hover:bg-blue-900"
          >
            閉じる
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
};
