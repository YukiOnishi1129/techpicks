"use client";

import { FC } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { FollowFavoriteArticleDropdownMenuContent } from "./FollowFavoriteArticleDropdownMenuContent";

type FollowFavoriteArticleDropdownMenuProps = {
  isFollowing: boolean;
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string,
    createdFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export const FollowFavoriteArticleDropdownMenu: FC<
  FollowFavoriteArticleDropdownMenuProps
> = ({
  isFollowing,
  articleId,
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
}) => {
  const sortedFavoriteArticleFolders = favoriteArticleFolders.sort(
    (prev, next) => {
      if (prev.createdAt < next.createdAt) return -1;
      if (prev.createdAt > next.createdAt) return 1;
      return 0;
    }
  );

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              {isFollowing ? (
                <FaHeart size={32} className="cursor-pointer" color="red" />
              ) : (
                <FaRegHeart size={32} className="cursor-pointer" />
              )}
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent className="px-4 py-3 font-semibold">
            <p>Save Article</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <FollowFavoriteArticleDropdownMenuContent
        articleId={articleId}
        favoriteArticleFolders={sortedFavoriteArticleFolders}
        handleCreateFavoriteArticle={handleCreateFavoriteArticle}
        handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
      />
    </DropdownMenu>
  );
};
