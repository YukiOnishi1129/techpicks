"use client";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useImage";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { FavoriteArticleType } from "@/types/favoriteArticle";

type FavoriteArticleCardItemProps = {
  favoriteArticle: FavoriteArticleType;
};

export const FavoriteArticleCardItem: FC<FavoriteArticleCardItemProps> = ({
  favoriteArticle,
}) => {
  const imageUrl = useCheckImageExist(
    favoriteArticle?.thumbnailUrl || undefined
  );

  return (
    <div className="relative w-full cursor-pointer rounded">
      <div className="justify-around md:flex">
        <div className="md:flex md:w-[30%] md:justify-center">
          <h3 className="mb-4 line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {favoriteArticle.title}
          </h3>
          <div className="flex w-full justify-center md:h-36 md:w-48">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full rounded-lg border-2 object-cover object-center shadow-md md:h-full"
              src={imageUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:w-[65%]">
          <h3 className="line-clamp-3 hidden pt-2 text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {favoriteArticle.title}
          </h3>

          <p className="flex pt-2 text-sm">
            {`register: ${showDiffDateToCurrentDate(favoriteArticle.createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};
