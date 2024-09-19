"use client";

import { FragmentOf } from "gql.tada";
import { FC } from "react";
import { IconContext } from "react-icons";
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

// import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

import { FollowFavoriteArticleDropdownMenuContent } from "./FollowFavoriteArticleDropdownMenuContent";
import { FollowFavoriteArticleDropdownMenuContentFragment } from "./FollowFavoriteArticleDropdownMenuFragment";

type FollowFavoriteArticleDropdownMenuProps = {
  isFollowing: boolean;
  articleId: string;
  data: FragmentOf<typeof FollowFavoriteArticleDropdownMenuContentFragment>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

export const FollowFavoriteArticleDropdownMenu: FC<
  FollowFavoriteArticleDropdownMenuProps
> = ({
  isFollowing,
  articleId,
  data,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              {isFollowing ? (
                <IconContext.Provider
                  value={{ className: "hover:text-rose-900" }}
                >
                  <FaHeart size={30} className="cursor-pointer" color="red" />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{ className: "hover:text-rose-600" }}
                >
                  <FaRegHeart size={30} className="cursor-pointer" />
                </IconContext.Provider>
              )}
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent className="px-4 py-3 ">
            <p>Save Article</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <FollowFavoriteArticleDropdownMenuContent
        articleId={articleId}
        data={data}
        handleCreateFavoriteArticle={handleCreateFavoriteArticle}
        handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
        handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
      />
    </DropdownMenu>
  );
};
