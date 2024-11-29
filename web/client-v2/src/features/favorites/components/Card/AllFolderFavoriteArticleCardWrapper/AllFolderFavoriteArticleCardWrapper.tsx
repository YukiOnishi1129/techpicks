"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { IconTitleLink } from "@/components/ui/link/IconTitleLink";
import { ShareLinks } from "@/components/ui/share";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";

import {
  AllFolderFavoriteArticleCardWrapperFragment,
  FavoriteFolderAllFolderArticleCardWrapperFragment,
} from "./AllFolderFavoriteArticleCardWrapperFragment";
import { AllFolderFavoriteArticleCardItem } from "../AllFolderFavoriteArticleCardItem";

type AllFolderFavoriteArticleCardWrapperProps = {
  user: User;
  data: FragmentOf<typeof AllFolderFavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderAllFolderArticleCardWrapperFragment
  >;
};

export const AllFolderFavoriteArticleCardWrapper: FC<
  AllFolderFavoriteArticleCardWrapperProps
> = ({ user, data, favoriteArticleFolders }) => {
  const fragment = readFragment(
    AllFolderFavoriteArticleCardWrapperFragment,
    data
  );
  const foldersFragment = readFragment(
    FavoriteFolderAllFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const faviconImageUrl = useCheckImageExist(fragment.node.platformFaviconUrl);

  return (
    <div
      key={fragment.node.id}
      className="rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2"
    >
      <div className="grid gap-4">
        <div className="flex h-16 justify-between border-b-2 md:ml-6">
          <IconTitleLink
            url={fragment.node.platformUrl}
            iconImageUrl={fragment.node.platformFaviconUrl}
            title={fragment.node.platformName}
            target="_blank"
          />

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={fragment.node.title}
                shareUrl={fragment.node.articleUrl}
              />
            </div>
            <div className="mr-4">
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
            <div>
              {/* <RemoveFavoriteArticleAlertDialog
                favoriteArticleId={fragment.id}
                favoriteArticleTitle={fragment.title}
                targetFavoriteArticleFolderId={fragment.favoriteArticleFolderId}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
              /> */}
            </div>
          </div>
        </div>

        <div>
          <AllFolderFavoriteArticleCardItem data={fragment} />
        </div>
      </div>
    </div>
  );
};
