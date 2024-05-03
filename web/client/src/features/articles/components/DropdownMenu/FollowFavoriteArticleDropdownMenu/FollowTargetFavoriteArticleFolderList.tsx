"use client";

import { FC, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

type FollowTargetFavoriteArticleFolderListProps = {
  articleId: string;
  favoriteArticleFolder: FavoriteArticleFolderType;
};

export const FollowTargetFavoriteArticleFolderList: FC<
  FollowTargetFavoriteArticleFolderListProps
> = ({ articleId, favoriteArticleFolder }) => {
  const isFollowed = useMemo(
    () =>
      favoriteArticleFolder.favoriteArticles.some(
        (favoriteArticle) => favoriteArticle.articleId === articleId
      ),
    [articleId, favoriteArticleFolder.favoriteArticles]
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{favoriteArticleFolder.title}</p>
        {isFollowed ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
            // onClick={() =>
            //   onRemoveMyFeed(targetMyFeedId || "", myFeedFolder.id)
            // }
          >
            <span className="w-full group-hover:invisible">{"SAVED"}</span>
            <span className="invisible absolute w-full group-hover:visible">
              {"REMOVE"}
            </span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
            // onClick={() => onCreateMyFeed(myFeedFolder.id)}
          >
            {"SAVE"}
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
