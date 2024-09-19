"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { FollowTargetFavoriteArticleFolderItemFragment } from "./FollowFavoriteArticleDropdownMenuFragment";

type FollowTargetFavoriteArticleFolderItemProps = {
  data: FragmentOf<typeof FollowTargetFavoriteArticleFolderItemFragment>;
  articleId: string;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FragmentOf<
      typeof FollowTargetFavoriteArticleFolderItemFragment
    >
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export const FollowTargetFavoriteArticleFolderItem: FC<
  FollowTargetFavoriteArticleFolderItemProps
> = ({
  data,
  articleId,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
}) => {
  const fragment = readFragment(
    FollowTargetFavoriteArticleFolderItemFragment,
    data
  );
  const isFollowed = useMemo(
    () =>
      fragment?.favoriteArticles
        ? fragment.favoriteArticles.some(
            (favoriteArticle) => favoriteArticle.articleId === articleId
          )
        : false,
    [articleId, fragment]
  );

  const targetFavoriteArticleId = useMemo(() => {
    if (!fragment || !fragment?.favoriteArticles) return;
    const targetFavoriteArticle = fragment.favoriteArticles.find(
      (favoriteArticle) => favoriteArticle.articleId === articleId
    );
    return targetFavoriteArticle?.id;
  }, [articleId, fragment]);

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
              handleRemoveFavoriteArticle(
                targetFavoriteArticleId || "",
                fragment.id
              )
            }
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
            onClick={() => handleCreateFavoriteArticle(fragment.id)}
          >
            {"SAVE"}
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
