"use client";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { useManageFavoriteArticle } from "@/features/favorites/hooks/useManageFavoriteArticle";

import { IconTitleLink } from "@/shared/components/ui/link";
import { ShareLinks } from "@/shared/components/ui/share";

import {
  FavoriteArticleCardWrapperFragment,
  FavoriteFolderFavoriteArticleCardWrapperFragment,
} from "./FavoriteArticleCardWrapperFragment";
import { RemoveFavoriteArticleAlertDialog } from "../../Dialog";
import { CopyFavoriteArticleDropdownMenu } from "../../DropdownMenu/CopyFavoriteArticleDropdownMenu";
import { FavoriteArticleCardItem } from "../FavoriteArticleCardItem";

type FavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof FavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders }) => {
  const fragment = readFragment(FavoriteArticleCardWrapperFragment, data);
  const fragmentFavoriteFolders = readFragment(
    FavoriteFolderFavoriteArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const {
    handleCreateFavoriteArticle,
    handleCreateFavoriteArticleFolder,
    handleRemoveFavoriteArticle,
    handleRemoveFavoriteArticleCard,
  } = useManageFavoriteArticle({
    data: fragment,
    favoriteArticleFolders: fragmentFavoriteFolders,
  });

  return (
    <div
      key={fragment.id}
      className="mb-4 rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6 gap-2">
          <div className="flex">
            <IconTitleLink
              url={fragment.platformUrl}
              iconImageUrl={fragment.platformFaviconUrl}
              title={fragment.platformName}
              target="_blank"
            />
          </div>

          <div className="flex items-center justify-center p-4 gap-2">
            <div>
              <ShareLinks
                shareTitle={fragment.title}
                shareUrl={fragment.articleUrl}
              />
            </div>
            <div className="mt-2">
              <CopyFavoriteArticleDropdownMenu
                data={fragmentFavoriteFolders}
                articleId={fragment.articleId}
                targetFavoriteFolderId={fragment.favoriteArticleFolderId}
                onCreateFavoriteArticle={handleCreateFavoriteArticle}
                onRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                onCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              />
            </div>
            <div className="mt-2">
              <RemoveFavoriteArticleAlertDialog
                favoriteArticleId={fragment.id}
                favoriteArticleTitle={fragment.title}
                targetFavoriteArticleFolderId={fragment.favoriteArticleFolderId}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
              />
            </div>
          </div>
        </div>

        <FavoriteArticleCardItem data={fragment} />
      </div>
    </div>
  );
};
