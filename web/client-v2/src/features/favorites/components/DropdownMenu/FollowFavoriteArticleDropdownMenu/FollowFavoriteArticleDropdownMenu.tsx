"use client";

import { FragmentOf } from "gql.tada";
import { FC } from "react";
import { IconContext } from "react-icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/shared/components/ui/tooltip";

import { FollowFavoriteArticleDropdownMenuContent } from "./FollowFavoriteArticleDropdownMenuContent";
import { FollowFavoriteArticleDropdownMenuContentFragment } from "./FollowFavoriteArticleDropdownMenuFragment";

type FollowFavoriteArticleDropdownMenuProps = {
  isFollowing: boolean;
  data: FragmentOf<typeof FollowFavoriteArticleDropdownMenuContentFragment>;
  targetFavoriteArticleId?: string;
  followedFolderIds: Array<string>;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleFolderId: string,
    favoriteArticleId?: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string,
    title: string
  ) => Promise<void>;
};

export const FollowFavoriteArticleDropdownMenu: FC<
  FollowFavoriteArticleDropdownMenuProps
> = ({
  isFollowing,
  data,
  targetFavoriteArticleId,
  followedFolderIds,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
}) => {
  return (
    <DropdownMenu modal={false}>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              {isFollowing ? (
                <IconContext.Provider
                  value={{ className: "hover:text-rose-900" }}
                >
                  <FaHeart size={18} className="cursor-pointer" color="red" />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{ className: "hover:text-rose-600" }}
                >
                  <FaRegHeart size={18} className="cursor-pointer" />
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
        data={data}
        targetFavoriteArticleId={targetFavoriteArticleId}
        followedFolderIds={followedFolderIds}
        handleCreateFavoriteArticle={handleCreateFavoriteArticle}
        handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
        handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
      />
    </DropdownMenu>
  );
};
