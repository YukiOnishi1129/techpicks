"use client";
import Link from "next/link";
import { FC, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { ArticleType } from "@/types/article";
import { formatShowDateTime } from "@/lib/date";
import { FcBookmark } from "react-icons/fc";
import { User } from "@supabase/supabase-js";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import {
  createBookmark,
  deleteBookmark,
} from "@/features/bookmarks/repository/bookmark";

type ArticleDetailDialogProps = {
  article: ArticleType;
  user: User | undefined;
  children: React.ReactNode;
};

export const ArticleDetailDialog: FC<ArticleDetailDialogProps> = ({
  article,
  user,
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
        {open && <ArticleContent article={article} user={user} />}
      </DialogContent>
    </Dialog>
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

  const [bookmarkId, setBookmarkId] = useState<string | undefined>(
    article.bookmarkId
  );

  const handleAddBookmark = useCallback(async () => {
    if (!user) return;
    const id = await createBookmark({
      title: article.title,
      description: article.description,
      articleId: article.id,
      articleUrl: article.articleUrl,
      publishedAt: article.publishedAt,
      thumbnailURL: article.thumbnailURL,
      isRead: false,
      userId: user.id,
      platformId: article.platform.id,
    });
    console.log("🔥🔥🔥🔥🔥");
    console.log(id);
    setBookmarkId(id);
  }, []);

  const handleRemoveBookmark = useCallback(
    async (bookmarkId: string) => {
      console.log("🔥🔥🔥🔥🔥");
      console.log(bookmarkId);
      if (!user || !bookmarkId) return;

      await deleteBookmark({
        bookmarkId: bookmarkId,
        userId: user.id,
      });
      setBookmarkId(undefined);
    },
    [bookmarkId]
  );

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
              {formatShowDateTime(article.publishedAt)}
            </span>

            {user && (
              <div>
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
                    onClick={handleAddBookmark}
                  >
                    <MdOutlineBookmarkAdd className="inline-block" size={36} />
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="overflow-y-scroll">
        <Link href={article.articleUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
