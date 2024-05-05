"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FcBookmark } from "react-icons/fc";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { TwitterShareButton, XIcon } from "react-share";

import { FeedNameBadge } from "@/components/ui/badge/FeedNameBadge";
import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { useCheckImageExist } from "@/hooks/useImage";
import { useParseHtml } from "@/hooks/useParseHtml";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { ArticleType } from "@/types/article";

import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleDetailProps = {
  article: ArticleType;
  user: User | undefined;
};

export const ArticleDetail = ({ article, user }: ArticleDetailProps) => {
  const imageUrl = useCheckImageExist(article.thumbnailURL);
  const { convertParseHtml } = useParseHtml();

  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Article Detail",
      href: `/article/${article.id}`,
    },
  ];

  return (
    <div>
      <div className="my-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <div>
        <h1 className="mb-4 flex">
          <Link
            className="inline-block w-full cursor-pointer  text-lg font-semibold tracking-wide hover:text-blue-500"
            href={new URL(article.articleUrl)}
            target="_blank"
          >
            <span className="pb-4">{article.title}</span>
          </Link>
        </h1>

        {article.publishedAt && (
          <p className="pl-2 text-sm">
            {showDiffDateToCurrentDate(article.publishedAt)}
          </p>
        )}

        <div className="flex w-full items-center justify-between pt-2">
          <Link
            className="mb-2 hover:opacity-80"
            href={new URL(article.platform?.siteUrl || "")}
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
            <div className="flex justify-between">
              <TwitterShareButton
                title={article.title}
                url={article.articleUrl}
              >
                <XIcon className="inline-block" size={36} />
              </TwitterShareButton>
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

        <div className="mb-4 flex justify-around">
          <Link href={new URL(article.articleUrl)} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
        </div>
      </div>

      <div className="h-[400px] overflow-y-scroll md:h-[400px]">
        <Link href={new URL(article.articleUrl)} target="_blank">
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
                href={new URL(feed.siteUrl)}
                target="_blank"
              >
                <FeedNameBadge name={feed.name} />
              </Link>
            ))}
        </div>

        <div className="my-10 flex justify-around">
          <Link href={new URL(article.articleUrl)} target="_blank">
            <Button
              size={"lg"}
              className="w-full bg-blue-700 text-xl text-white hover:bg-blue-900"
            >
              READ MORE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
