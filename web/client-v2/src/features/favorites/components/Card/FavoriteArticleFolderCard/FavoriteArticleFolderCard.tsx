"use client";

import { FragmentOf, readFragment } from "gql.tada";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";

import { FavoriteArticleFolderCardFragment } from "./FavoriteArticleFolderCardFragment";

// import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

// import { UpdateFavoriteArticleFolderDialog } from "../Dialog";

type FavoriteArticleFolderCardProps = {
  data: FragmentOf<typeof FavoriteArticleFolderCardFragment>;
  //   handleUpdateFavoriteArticleFolder: ({
  //     id,
  //     title,
  //     description,
  //   }: {
  //     id: string;
  //     title: string;
  //     description: string;
  //   }) => Promise<void>;
  //   handleDeleteFavoriteArticleFolder: (id: string) => Promise<void>;
};

export const FavoriteArticleFolderCard: FC<FavoriteArticleFolderCardProps> = ({
  data,
}) => {
  const fragment = readFragment(FavoriteArticleFolderCardFragment, data);

  const latestFavoriteArticle =
    fragment?.favoriteArticles && fragment.favoriteArticles.length > 0
      ? fragment.favoriteArticles[0]
      : undefined;

  return (
    <div className="mb-4 bg-primary-foreground">
      <div className="w-full rounded border-2 px-4 py-2">
        <div className="mb-2 flex h-[48px] w-full items-center justify-between border-b-2 pb-2">
          <h3 className="truncate px-2 text-left text-base font-bold tracking-wide md:text-xl">
            {/* <Link href={`/favorite-article-folder/${favoriteArticleFolder.id}`}>
              {favoriteArticleFolder.title}
            </Link> */}
            {fragment.title}
          </h3>
          {/* <UpdateFavoriteArticleFolderDialog
            favoriteArticleFolderId={favoriteArticleFolder.id}
            title={favoriteArticleFolder.title}
            description={favoriteArticleFolder.description || ""}
            handleUpdateFavoriteArticleFolder={
              handleUpdateFavoriteArticleFolder
            }
            handleDeleteFavoriteArticleFolder={
              handleDeleteFavoriteArticleFolder
            }
          /> */}
        </div>

        {/* <p className="line-clamp-3 h-[62px] w-full text-sm">
          <Link href={`/favorite-article-folder/${favoriteArticleFolder.id}`}>
            {favoriteArticleFolder?.description ? (
              favoriteArticleFolder.description
            ) : (
              <span className="text-gray-500">{"No description"}</span>
            )}
          </Link>
        </p> */}
        <div className="border-t-2 py-2">
          {latestFavoriteArticle ? (
            <div>
              <h3 className="mb-2">Latest article</h3>
              <h4 className="line-clamp-1 text-sm font-bold text-gray-500">
                {latestFavoriteArticle?.title}
              </h4>
              <div className="mt-2 flex w-full items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={latestFavoriteArticle?.thumbnailUrl || ""}
                  alt=""
                  className="mt-2 max-h-[160px] rounded-md object-cover md:max-h-[100px]"
                />
              </div>
              <div className="mt-4 flex justify-center">
                {/* <Link
                  href={`/favorite-article-folder/${favoriteArticleFolder.id}`}
                >
                  <Button>{"SHOW MORE"}</Button>
                </Link> */}
              </div>
            </div>
          ) : (
            <div className="mt-4 flex size-full items-center justify-center ">
              <Link href={`/`}>
                <Button>{"ADD ARTICLE"}</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 "></div>
      </div>
    </div>
  );
};
