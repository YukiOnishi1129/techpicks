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
  SheetClose,
} from "@/components/ui/sheet";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { formatShowDateTime } from "@/lib/date";

import { FavoriteArticleType } from "@/types/favoriteArticle";

type FavoriteArticleDetailSheetProps = {
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
  children: React.ReactNode;
};

export const FavoriteArticleDetailSheet: FC<
  FavoriteArticleDetailSheetProps
> = ({
  favoriteArticleFolderId,
  favoriteArticle,
  children,
}: FavoriteArticleDetailSheetProps) => {
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
        {open && (
          <FavoriteArticleContent
            favoriteArticleFolderId={favoriteArticleFolderId}
            favoriteArticle={favoriteArticle}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

type FavoriteArticleContentProps = {
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
};

const FavoriteArticleContent: FC<FavoriteArticleContentProps> = ({
  favoriteArticleFolderId,
  favoriteArticle,
}) => {
  const imageUrl = useCheckImageExist(
    favoriteArticle?.thumbnailURL || undefined
  );
  const { convertParseHtml } = useParseHtml();

  return (
    <>
      <SheetHeader className="mb-4">
        <SheetTitle className="flex">
          <Link
            className="inline-block w-full cursor-pointer text-lg font-semibold  tracking-wide hover:text-blue-500"
            href={favoriteArticle.articleUrl}
            target="_blank"
          >
            <h1 className="pb-4">{favoriteArticle.title}</h1>
          </Link>
        </SheetTitle>

        <p className="pl-2 text-sm">
          {formatShowDateTime(favoriteArticle.publishedAt)}
        </p>

        <div className="flex w-full items-center justify-between pt-2">
          <Link
            className="mb-2 hover:opacity-80"
            href={favoriteArticle?.platformUrl || ""}
            target="_blank"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mr-2 inline-block size-[24px]"
              src={favoriteArticle?.platformFaviconUrl || ""}
              alt=""
            />
          </Link>
        </div>

        <div className="my-10 flex justify-around">
          <Link href={favoriteArticle.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              {"READ MORE"}
            </Button>
          </Link>
          <SheetClose asChild>
            <Button variant="outline" className="inline-block w-1/3 text-xl">
              CLOSE
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>

      <div className="h-[400px] overflow-y-scroll">
        <Link href={favoriteArticle.articleUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto h-[370px] cursor-pointer rounded-md object-cover object-center pb-8 hover:opacity-80"
            src={imageUrl}
            alt=""
          />
        </Link>

        <div className="text-lg tracking-wide">
          <div>{convertParseHtml(favoriteArticle.description)}</div>
        </div>

        <div className="my-10 flex justify-around">
          <Link href={favoriteArticle.articleUrl} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              {"READ MORE"}
            </Button>
          </Link>
          <SheetClose asChild>
            <Button
              variant="outline"
              className=" inline-block w-1/3 text-xl hover:bg-blue-900"
            >
              {" CLOSE"}
            </Button>
          </SheetClose>
        </div>
      </div>
    </>
  );
};
