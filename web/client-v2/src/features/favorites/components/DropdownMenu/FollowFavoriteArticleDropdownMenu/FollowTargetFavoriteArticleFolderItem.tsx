"use client";

import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { FollowTargetFavoriteArticleFolderItemFragment } from "./FollowFavoriteArticleDropdownMenuFragment";

type FollowTargetFavoriteArticleFolderItemProps = {
  data: FragmentOf<typeof FollowTargetFavoriteArticleFolderItemFragment>;
  articleId: string;
  followedFolderIds: Array<string>;
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
  followedFolderIds,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
}) => {
  const fragment = readFragment(
    FollowTargetFavoriteArticleFolderItemFragment,
    data
  );

  const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] =
    useState(fragment);

  const isFollowed = useMemo(
    () =>
      showFavoriteArticleFolders.favoriteArticles.some(
        (favoriteArticle) => favoriteArticle.articleId === articleId
      ),
    [articleId, showFavoriteArticleFolders]
  );

  const targetFavoriteArticleId = useMemo(() => {
    const targetFavoriteArticle =
      showFavoriteArticleFolders.favoriteArticles.find(
        (favoriteArticle) => favoriteArticle.articleId === articleId
      );
    return targetFavoriteArticle?.id;
  }, [articleId, showFavoriteArticleFolders]);

  const handleAddFavoriteArticle = useCallback(async () => {
    const id = await handleCreateFavoriteArticle(showFavoriteArticleFolders.id);
    if (!id) return;
    setShowFavoriteArticleFolders((prev) => ({
      ...prev,
      favoriteArticles: [
        ...prev.favoriteArticles,
        {
          articleId,
          id,
        },
      ],
    }));
  }, [articleId, handleCreateFavoriteArticle, showFavoriteArticleFolders.id]);

  const handleDeleteFavoriteArticle = useCallback(async () => {
    const id = await handleRemoveFavoriteArticle(
      targetFavoriteArticleId || "",
      showFavoriteArticleFolders.id
    );
    if (!id) return;
    setShowFavoriteArticleFolders((prev) => ({
      ...prev,
      favoriteArticles: prev.favoriteArticles.filter(
        (favoriteArticle) => favoriteArticle.id !== id
      ),
    }));
  }, [
    showFavoriteArticleFolders.id,
    targetFavoriteArticleId,
    handleRemoveFavoriteArticle,
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="ml-2 w-1/2 truncate">
          {showFavoriteArticleFolders.title}
        </p>
        {isFollowed ? (
          <Button
            variant="outline"
            size="sm"
            className="group relative border-emerald-500 bg-emerald-500 font-bold text-white hover:border-red-600 hover:text-red-600"
            onClick={handleDeleteFavoriteArticle}
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
            onClick={handleAddFavoriteArticle}
          >
            {"SAVE"}
          </Button>
        )}
      </div>
      <DropdownMenuSeparator />
    </div>
  );
};
