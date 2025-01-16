"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo } from "react";

import { useManageAllFolderFavoriteArticle } from "@/features/favorites/hooks/useManageAllFolderFavoriteArticle";

import { IconTitleLink } from "@/shared/components/ui/link/IconTitleLink";
import { ShareLinks } from "@/shared/components/ui/share";

import {
  AllFolderFavoriteArticleCardWrapperFragment,
  FavoriteFolderAllFolderArticleCardWrapperFragment,
} from "./AllFolderFavoriteArticleCardWrapperFragment";
import { AllCopyFavoriteArticleDropdownMenu } from "../../DropdownMenu";
import { AllFolderFavoriteArticleCardItem } from "../AllFolderFavoriteArticleCardItem";

type AllFolderFavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof AllFolderFavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderAllFolderArticleCardWrapperFragment
  >;
};

export const AllFolderFavoriteArticleCardWrapper: FC<
  AllFolderFavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders }) => {
  const fragment = readFragment(
    AllFolderFavoriteArticleCardWrapperFragment,
    data
  );
  const fragmentFolders = readFragment(
    FavoriteFolderAllFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const {
    handleCreateFavoriteArticle,
    handleRemoveFavoriteArticle,
    handleCreateFavoriteArticleFolder,
  } = useManageAllFolderFavoriteArticle({
    data: fragment.node,
    favoriteArticleFolders: fragmentFolders,
  });

  const isLastIncludedFolder = useMemo(
    () => fragment.favoriteArticleFolders.length === 1,
    [fragment.favoriteArticleFolders]
  );

  return (
    <div
      key={fragment.node.id}
      className="rounded-2xl border bg-primary-foreground px-4 pb-4 md:px-2"
    >
      <div className="grid gap-4">
        <div className="flex h-16 justify-between border-b md:ml-6">
          <IconTitleLink
            url={fragment.node.platformUrl}
            iconImageUrl={fragment.node.platformFaviconUrl}
            title={fragment.node.platformName}
            target="_blank"
          />

          <div className="flex items-center justify-center gap-4 p-4">
            <ShareLinks
              shareTitle={fragment.node.title}
              shareUrl={fragment.node.articleUrl}
            />
            <AllCopyFavoriteArticleDropdownMenu
              data={fragmentFolders}
              articleId={fragment.node.articleId}
              articleTitle={fragment.node.title}
              isLastIncludedFolder={isLastIncludedFolder}
              onCreateFavoriteArticle={handleCreateFavoriteArticle}
              onRemoveFavoriteArticle={handleRemoveFavoriteArticle}
              onCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
            />
          </div>
        </div>

        <div>
          <AllFolderFavoriteArticleCardItem data={fragment} />
        </div>
      </div>
    </div>
  );
};
