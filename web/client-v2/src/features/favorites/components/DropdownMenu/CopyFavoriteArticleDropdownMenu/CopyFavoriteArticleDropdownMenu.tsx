"use client";

import { FragmentOf } from "gql.tada";
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

import { CopyFavoriteArticleDropdownMenuContent } from "./CopyFavoriteArticleDropdownMenuContent";
import { CopyFavoriteArticleDropdownMenuContentFragment } from "./CopyFavoriteArticleDropdownMenuFragment";

type CopyFavoriteArticleDropdownMenuProps = {
  data: FragmentOf<typeof CopyFavoriteArticleDropdownMenuContentFragment>;
  articleId: string;
  targetFavoriteArticleId: string;
  targetFavoriteFolderId: string;
  handleCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string
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
  data,
  articleId,
  targetFavoriteArticleId,
  targetFavoriteFolderId,
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
        data={data}
        articleId={articleId}
        targetFavoriteArticleId={targetFavoriteArticleId}
        targetFavoriteFolderId={targetFavoriteFolderId}
        handleCreateFavoriteArticle={handleCreateFavoriteArticle}
        handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
        handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
      />
    </DropdownMenu>
  );
};
