"use client";

import { FC } from "react";
import { IconContext } from "react-icons";
import { FaRegHeart } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AddFavoriteArticleTooltipProps = {
  favoriteArticleFolderId: string;
  handleCreateFavoriteArticle: (
    favoriteArticleFolderId: string
  ) => Promise<string | undefined>;
};

export const AddFavoriteArticleTooltip: FC<AddFavoriteArticleTooltipProps> = ({
  favoriteArticleFolderId,
  handleCreateFavoriteArticle,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => handleCreateFavoriteArticle(favoriteArticleFolderId)}
        >
          <IconContext.Provider value={{ className: "hover:text-rose-600" }}>
            <FaRegHeart size={30} className="cursor-pointer" />
          </IconContext.Provider>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save Article</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
