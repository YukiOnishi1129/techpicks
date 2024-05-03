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
};

export const FollowFavoriteArticleDropdownMenu: FC<
  FollowFavoriteArticleDropdownMenuProps
> = ({ isFollowing, articleId, favoriteArticleFolders }) => {
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
        favoriteArticleFolders={favoriteArticleFolders}
      />
    </DropdownMenu>
  );
};
