"use client";

import Link from "next/link";
import { FC } from "react";

import { useStatusToast } from "@/hooks/useStatusToast";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type FavoriteArticleFolderCardProps = {
  favoriteArticleFolder: FavoriteArticleFolderType;
};

export const FavoriteArticleFolderCard: FC<FavoriteArticleFolderCardProps> = ({
  favoriteArticleFolder,
}) => {
  const { successToast, failToast } = useStatusToast();
  return (
    <div className="mb-4">
      <div className="max-h-[400px] w-full rounded border-2 px-4 py-2 md:h-[340px]">
        <div className="mb-2 flex h-[48px] w-full items-center justify-between border-b-2 pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            <Link href={`/favorite-article-folder/${favoriteArticleFolder.id}`}>
              {favoriteArticleFolder.title}
            </Link>
          </h3>
        </div>

        <p className="line-clamp-3 h-[62px] w-full text-sm">
          <Link href={`/favorite-article-folder/${favoriteArticleFolder.id}`}>
            {favoriteArticleFolder.description}
          </Link>
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          {/* {showFeedList.map((feed) => {
            return (
              <div key={`${myFeedFolder}-${feed.id}`}>
                <Link href={`/my-feed-folder/${myFeedFolder.id}`}>
                  <img
                    className="h-8"
                    src={feed.platform.faviconUrl}
                    alt={feed.name}
                  />
                  <span>{feed.name}</span>
                </Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};
