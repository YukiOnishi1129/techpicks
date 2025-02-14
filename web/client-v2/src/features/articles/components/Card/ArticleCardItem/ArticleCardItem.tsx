"use client";

import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import NextLink from "next/link";
import { FC } from "react";

import { ZoomableImage } from "@/shared/components/ui/image";
import { Link } from "@/shared/components/ui/link";
import { showDiffDateToCurrentDate } from "@/shared/lib/date";

import styles from "./ArticleCardItem.module.css";
import { ArticleCardItemFragment } from "./ArticleCardItemFragment";
import { ShowArticleCommentDialog } from "../../Dialog";

type ArticleCardItemProps = {
  data: FragmentOf<typeof ArticleCardItemFragment>;
};

export const ArticleCardItem: FC<ArticleCardItemProps> = ({ data }) => {
  const fragment = readFragment(ArticleCardItemFragment, data);

  return (
    <div className="relative w-full rounded md:px-4">
      <div className="justify-around gap-4 md:flex">
        <div className="grid gap-2 md:flex md:w-[30%] md:justify-center">
          <h3 className="line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {fragment.title}
          </h3>

          <Link
            url={fragment.articleUrl}
            target={"_blank"}
            className="flex w-full justify-center md:h-36 md:w-48"
          >
            <ZoomableImage
              imageUrl={fragment.thumbnailUrl}
              alt={fragment.title}
            />
          </Link>
        </div>

        <div className="grid gap-2 md:w-[65%]">
          <h3 className="line-clamp-3 hidden text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {fragment.title}
          </h3>

          {fragment?.publishedAt && (
            <p className="text-sm">
              {showDiffDateToCurrentDate(fragment.publishedAt)}
            </p>
          )}

          <div
            className={clsx(
              "flex flex-row items-center gap-2 overflow-x-auto",
              styles["hide-scrollbar"]
            )}
          >
            {fragment?.feeds &&
              fragment.feeds.length > 0 &&
              fragment.feeds.map((feed) => (
                <NextLink
                  href={`/feed/${feed.id}`}
                  target="_blank"
                  key={`${fragment.id}-${feed.id}`}
                  className="shrink-0 snap-start text-sm text-orange-400 hover:text-orange-700"
                >
                  {`# ${feed.name}`}
                </NextLink>
              ))}
          </div>

          {fragment?.comment && (
            <ShowArticleCommentDialog data={fragment.comment} />
            // <p className="flex items-center gap-2 text-sm">
            //   <FaComment className="inline-block" size={18} />
            //   <span className="line-clamp-1 ">{fragment.comment.comment}</span>
            // </p>
          )}
        </div>
      </div>
    </div>
  );
};
