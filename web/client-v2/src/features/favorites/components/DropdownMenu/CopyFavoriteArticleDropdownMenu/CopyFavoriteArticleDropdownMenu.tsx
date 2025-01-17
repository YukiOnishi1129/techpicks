"use client";

import { FragmentOf } from "gql.tada";
import { FC } from "react";
import { IconContext } from "react-icons";
import { FaRegCopy } from "react-icons/fa";

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

import { CopyFavoriteArticleDropdownMenuContent } from "./CopyFavoriteArticleDropdownMenuContent";
import { CopyFavoriteArticleDropdownMenuContentFragment } from "./CopyFavoriteArticleDropdownMenuFragment";

type CopyFavoriteArticleDropdownMenuProps = {
  data: FragmentOf<typeof CopyFavoriteArticleDropdownMenuContentFragment>;
  articleId: string;
  targetFavoriteFolderId: string;
  onCreateFavoriteArticle: (
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  onRemoveFavoriteArticle: (
    favoriteArticleId: string,
    targetFavoriteArticleFolderId: string
  ) => Promise<string | undefined>;
  onCreateFavoriteArticleFolder: (
    favoriteArticleFolderId: string,
    title: string
  ) => Promise<void>;
};

export const CopyFavoriteArticleDropdownMenu: FC<
  CopyFavoriteArticleDropdownMenuProps
> = ({
  data,
  articleId,
  targetFavoriteFolderId,
  onCreateFavoriteArticle,
  onRemoveFavoriteArticle,
  onCreateFavoriteArticleFolder,
}) => {
  return (
    <DropdownMenu modal={false}>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              <IconContext.Provider
                value={{ className: "hover:text-rose-600" }}
              >
                <FaRegCopy size={18} className="cursor-pointer" />
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
        targetFavoriteFolderId={targetFavoriteFolderId}
        onCreateFavoriteArticle={onCreateFavoriteArticle}
        onRemoveFavoriteArticle={onRemoveFavoriteArticle}
        onCreateFavoriteArticleFolder={onCreateFavoriteArticleFolder}
      />
    </DropdownMenu>
  );
};
