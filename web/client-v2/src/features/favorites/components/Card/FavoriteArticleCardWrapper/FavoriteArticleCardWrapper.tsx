"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useCallback, useState } from "react";

import { logoutToLoginPage } from "@/features/auth/actions/auth";
// import { fetchFavoriteArticleFolderByIdAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";

import { ShareLinks } from "@/components/ui/share";

import { useCheckImageExist } from "@/hooks/useCheckImageExist";
import { useServerRevalidatePage } from "@/hooks/useServerRevalidatePage";
import { useStatusToast } from "@/hooks/useStatusToast";

import {
  FavoriteArticleCardWrapperFragment,
  FavoriteFolderFavoriteArticleCardWrapperFragment,
} from "./FavoriteArticleCardWrapperFragment";

// import { FavoriteArticleType } from "@/types/favoriteArticle";
// import { FavoriteArticleFolderType } from "@/types/favoriteArticleFolder";

// import { FavoriteArticleCardItem } from "./FavoriteArticleCardItem";
// import {
//   fetchFavoriteArticleAPI,
//   fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAndArticleUrlAPI,
// } from "../../actions/favoriteArticle";
// import {
//   createFavoriteArticle,
//   deleteFavoriteArticle,
// } from "../../repository/favoriteArticle";
// import { RemoveFavoriteArticleAlertDialog } from "../Dialog";
// import { CopyFavoriteArticleDropdownMenu } from "../DropdownMenu";
// import { FavoriteArticleDetailSheet } from "../Sheet";

type FavoriteArticleCardWrapperProps = {
  data: FragmentOf<typeof FavoriteArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderFavoriteArticleCardWrapperFragment
  >;
  user?: User;
  favoriteArticleFolderId: string;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({ data, favoriteArticleFolders, user, favoriteArticleFolderId }) => {
  const fragment = readFragment(FavoriteArticleCardWrapperFragment, data);
  const fragmentFolders = readFragment(
    FavoriteFolderFavoriteArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const faviconImageUrl = useCheckImageExist(fragment.platformFaviconUrl);
  const { successToast, failToast } = useStatusToast();
  const { revalidatePage } = useServerRevalidatePage();

  const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] =
    useState(fragmentFolders);

  const handleCreateFavoriteArticle = useCallback(
    async (targetFavoriteArticleFolderId: string) => {
      // 1. check user
      if (!user) {
        failToast({
          description: "Please login to follow the article",
        });
        await logoutToLoginPage();
        return;
      }
      // 2. check out favoriteArticle by favoriteArticleFolderId and articleId

      // 3. create favoriteArticle

      return "id";
    },
    [failToast, user]
  );

  const handleCreateFavoriteArticleFolder = useCallback(
    async (favoriteArticleFolderId: string) => {},
    []
  );

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleId: string, favoriteArticleFolderId?: string) => {
      if (!user) {
        failToast({
          description: "Please login to unfollow the article",
        });
        await logoutToLoginPage();
        return;
      }

      // check count favoriteArticle by favoriteArticleId

      // delete favoriteArticle

      return "id";
    },
    [failToast, user]
  );

  const handleRemoveFavoriteArticleCard = useCallback(
    async (favoriteArticleId: string) => {
      const id = await handleRemoveFavoriteArticle(favoriteArticleId);
      if (!id) return;
      await revalidatePage();
      return id;
    },
    [handleRemoveFavoriteArticle, revalidatePage]
  );

  return (
    <div
      key={fragment.id}
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
                {fragment.platformName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={fragment.title}
                shareUrl={fragment.articleUrl}
              />
            </div>
            <div className="mr-4">
              {/* <CopyFavoriteArticleDropdownMenu
                articleId={favoriteArticle.articleId || ""}
                favoriteArticleFolders={showOtherFavoriteArticleFolders}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              /> */}
            </div>
            <div>
              {/* <RemoveFavoriteArticleAlertDialog
                favoriteArticleId={favoriteArticle.id}
                favoriteArticleTitle={favoriteArticle.title}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
              /> */}
            </div>
          </div>
        </div>

        {/* <FavoriteArticleDetailSheet
          favoriteArticle={favoriteArticle}
          otherFavoriteArticleFolders={showOtherFavoriteArticleFolders}
          handleCreateFavoriteArticle={handleCreateFavoriteArticle}
          handleRemoveFavoriteArticle={handleRemoveFavoriteArticleCard}
          handleCreateFavoriteArticleFolder={handleCreateFavoriteArticleFolder}
        >
          <FavoriteArticleCardItem favoriteArticle={favoriteArticle} />
        </FavoriteArticleDetailSheet> */}
      </div>
    </div>
  );
};
