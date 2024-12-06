"use client";
import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import NextLink from "next/link";
import { FC } from "react";

import { ZoomableImage } from "@/components/ui/image";
import { Link } from "@/components/ui/link";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

import { showDiffDateToCurrentDate } from "@/lib/date";

import styles from "./AllFolderFavoriteArticleCardItem.module.css";
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
            <ZoomableImage
              imageUrl={imageUrl || ""}
              alt={fragment.node.title}
            />
          </Link>
        </div>

        <div className="grid gap-2 md:w-[65%]">
          <h3 className="line-clamp-3 hidden text-left text-lg font-bold tracking-wide md:block md:w-full md:text-xl">
            {fragment.node.title}
          </h3>

          <p className="text-sm">
            {`register: ${showDiffDateToCurrentDate(fragment.node.createdAt)}`}
          </p>

          <div
            className={clsx(
              "flex flex-row items-center gap-2 overflow-x-auto",
              styles["hide-scrollbar"]
            )}
          >
            {fragment.favoriteArticleFolders.map((folder) => (
              <NextLink
                href={`/favorite/article/${folder.id}`}
                target="_blank"
                key={folder.id}
                className="shrink-0 snap-start text-sm text-orange-400  hover:text-orange-700"
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
