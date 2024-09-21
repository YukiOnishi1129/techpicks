"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { CopyTargetFavoriteArticleFolderItemFragment } from "./CopyFavoriteArticleDropdownMenuFragment";

type CopyTargetFavoriteArticleFolderItemProps = {
  data: FragmentOf<typeof CopyTargetFavoriteArticleFolderItemFragment>;
  articleId: string;
  targetFavoriteArticleId: string;
  handleCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId?: string
  ) => Promise<string | undefined>;
};

export const CopyTargetFavoriteArticleFolderItem: FC<
  CopyTargetFavoriteArticleFolderItemProps
> = ({
  data,
  articleId,
  targetFavoriteArticleId,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
}) => {
  const fragment = readFragment(
    CopyTargetFavoriteArticleFolderItemFragment,
    data
  );

  const isFollowed = useMemo(
    () =>
      fragment.favoriteArticles.some(
        (favoriteArticle) => favoriteArticle.articleId === articleId
      ),
    [articleId, fragment]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">{fragment.title}</p>
        {isFollowed ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
            onClick={() =>
              handleRemoveFavoriteArticle(targetFavoriteArticleId, fragment.id)
            }
          >
            <span className="w-full group-hover:invisible">{"COPIED"}</span>
            <span className="invisible absolute w-full group-hover:visible">
              {"REMOVE"}
            </span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
            onClick={() => handleCreateFavoriteArticle(fragment.id)}
          >
            {"COPY"}
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
