"use client";

import { FC } from "react";
import { IconContext } from "react-icons";
import { FaRegCopy } from "react-icons/fa";

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

import { CopyFavoriteArticleDropdownMenuContent } from "./CopyFavoriteArticleDropdownMenuContent";

type CopyFavoriteArticleDropdownMenuProps = {
  articleId: string;
  favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  handleCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string,
    targetFavoriteArticleFolder?: FavoriteArticleFolderType
  ) => Promise<string | undefined>;
  handleRemoveFavoriteArticle: (
    favoriteArticleId: string,
    favoriteArticleFolderId?: string
  ) => Promise<string | undefined>;
  handleCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string
  ) => Promise<void>;
};

export const CopyFavoriteArticleDropdownMenu: FC<
  CopyFavoriteArticleDropdownMenuProps
> = ({
  articleId,
  favoriteArticleFolders,
  handleCreateFavoriteArticle,
  handleRemoveFavoriteArticle,
  handleCreateFavoriteArticleFolder,
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
              <IconContext.Provider
                value={{ className: "hover:text-rose-600" }}
              >
                <FaRegCopy size={30} className="cursor-pointer" />
              </IconContext.Provider>
            </TooltipTrigger>
          </DropdownMenuTrigger>

          <TooltipContent className="px-4 py-3 ">
            <p>Copy article to other folder</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CopyFavoriteArticleDropdownMenuContent
        articleId={articleId}
        favoriteArticleFolders={sortedFavoriteArticleFolders}
        handleCreateFavoriteArticle={handleCreateFavoriteArticle}
        handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
        handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
      />
    </DropdownMenu>
  );
};
