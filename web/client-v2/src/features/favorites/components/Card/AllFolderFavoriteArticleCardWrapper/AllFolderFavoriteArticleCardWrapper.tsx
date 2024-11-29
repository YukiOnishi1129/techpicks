"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

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
      className="mb-4 rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={faviconImageUrl}
                alt=""
              />
              <span className="hidden font-bold md:inline-block">
                {fragment.node.platformName}
              </span>
            </div>
          </div>

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

        <AllFolderFavoriteArticleCardItem data={fragment} />
      </div>
    </div>
  );
};
