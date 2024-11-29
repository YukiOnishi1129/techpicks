"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

import { showDiffDateToCurrentDate } from "@/lib/date";

import { AllFolderFavoriteArticleCardItemFragment } from "./AllFolderFavoriteArticleCardItemFragment";

type Props = {
  data: FragmentOf<typeof AllFolderFavoriteArticleCardItemFragment>;
};

export const AllFolderFavoriteArticleCardItem: FC<Props> = ({ data }) => {
  const fragment = readFragment(AllFolderFavoriteArticleCardItemFragment, data);
  const imageUrl = useCheckImageExist(fragment.node.thumbnailUrl);

  return (
    <div className="relative w-full rounded">
      <div className="justify-around md:flex">
        <div className="md:flex md:w-[30%] md:justify-center">
          <h3 className="mb-4 line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {fragment.node.title}
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
            {fragment.node.title}
          </h3>

          <div>
            {fragment.favoriteArticleFolders.map((folder) => (
              <p key={folder.id} className="pt-2 text-sm text-orange-400">
                # {folder.title}
              </p>
            ))}
          </div>

          <p className="flex pt-2 text-sm">
            {`register: ${showDiffDateToCurrentDate(fragment.node.createdAt)}`}
          </p>
        </div>
      </div>
    </div>
  );
};
