"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { IconTitleLink } from "@/shared/components/ui/link/IconTitleLink";
import { ShareLinks } from "@/shared/components/ui/share";

import {
  AllFolderFavoriteArticleCardWrapperFragment,
  FavoriteFolderAllFolderArticleCardWrapperFragment,
} from "./AllFolderFavoriteArticleCardWrapperFragment";
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
  const foldersFragment = readFragment(
    FavoriteFolderAllFolderArticleCardWrapperFragment,
    favoriteArticleFolders
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
            {/* <CopyFavoriteArticleDropdownMenu
                data={showFavoriteArticleFolders}
                articleId={fragment.articleId}
                targetFavoriteFolderId={fragment.favoriteArticleFolderId}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              /> */}
          </div>
        </div>

        <div>
          <AllFolderFavoriteArticleCardItem data={fragment} />
        </div>
      </div>
    </div>
  );
};
