"use client";
import { FragmentOf, readFragment } from "gql.tada";
import NextLink from "next/link";
import { FC } from "react";

import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="grid justify-around gap-4 md:flex">
        <div className="grid gap-2 md:flex md:w-[30%] md:justify-center">
          <h3 className="line-clamp-3 block text-left text-lg font-bold tracking-wide md:hidden md:w-full md:text-xl">
            {fragment.node.title}
          </h3>
          <Link
            url={fragment.node.articleUrl}
            target={"_blank"}
            className="flex w-full justify-center md:h-36 md:w-48"
          >
            {imageUrl ? (
              <div className="inline-block overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full cursor-pointer rounded-lg border-2 object-cover object-center shadow-md transition-transform duration-300 ease-in-out hover:scale-110 md:h-full"
                  src={imageUrl}
                  alt=""
                />
              </div>
            ) : (
              <Skeleton className="h-full rounded-lg border-2 object-cover object-center shadow-md md:h-full" />
            )}
          </Link>
        </div>

        <div className="grid gap-2 md:w-[65%]">
          <h3 className="line-clamp-3 hidden text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {fragment.node.title}
          </h3>

          <p className="text-sm">
            {`register: ${showDiffDateToCurrentDate(fragment.node.createdAt)}`}
          </p>

          <div className="flex flex-wrap gap-2">
            {fragment.favoriteArticleFolders.map((folder) => (
              <NextLink
                href={`/favorite/article/${folder.id}`}
                target="_blank"
                key={folder.id}
                className="text-sm text-orange-400 hover:text-orange-500"
              >
                {`# ${folder.title}`}
              </NextLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
