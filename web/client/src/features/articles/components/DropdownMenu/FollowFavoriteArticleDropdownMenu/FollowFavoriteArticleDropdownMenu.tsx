"use client";

import { FC } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type FollowFavoriteArticleDropdownMenuProps = {
  isFollowing: boolean;
};

export const FollowFavoriteArticleDropdownMenu: FC<
  FollowFavoriteArticleDropdownMenuProps
> = ({ isFollowing }) => {
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

      <DropdownMenuContent align="end" className="w-[200px]">
        aaaa
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
