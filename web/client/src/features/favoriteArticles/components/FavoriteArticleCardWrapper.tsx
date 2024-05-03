"use client";
import { User } from "@supabase/supabase-js";
import { FC, useCallback, useState } from "react";

import { ShareLinks } from "@/components/ui/share";

import { useCheckImageExist } from "@/hooks/useImage";
import { useStatusToast } from "@/hooks/useStatusToast";

import { FavoriteArticleType } from "@/types/favoriteArticle";

import { RemoveFavoriteArticleAlertDialog } from "./Dialog/RemoveFavoriteArticleAlertDialog";
import { FavoriteArticleCard } from "./FavoriteArticleCard";
import { FavoriteArticleDetailSheet } from "./FavoriteArticleDetailSheet";
import { AddFavoriteArticleTooltip } from "./Tooltip/AddFavoriteArticleTooltip";
import {
  fetchFavoriteArticleAPI,
  fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAPI,
} from "../actions/favoriteArticle";
import {
  createFavoriteArticle,
  deleteFavoriteArticle,
} from "../repository/favoriteArticle";

type FavoriteArticleCardWrapperProps = {
  user?: User;
  favoriteArticleFolderId: string;
  favoriteArticle: FavoriteArticleType;
};

export const FavoriteArticleCardWrapper: FC<
  FavoriteArticleCardWrapperProps
> = ({ user, favoriteArticleFolderId, favoriteArticle }) => {
  const faviconImageUrl = useCheckImageExist(
    favoriteArticle?.platformFaviconUrl || "undefined"
  );
  const [isFollowing, setIsFollowing] = useState(true);
  const { successToast, failToast } = useStatusToast();

  const handleCreateFavoriteArticle = useCallback(async () => {
    // 1. check user
    if (!user) {
      failToast({
        description: "Please login to follow the article",
      });
      return;
    }
    // 2. check out favoriteArticle by favoriteArticleFolderId and articleId
    const resCount =
      await fetchFavoriteArticleCountByFavoriteArticleFolderIdAndArticleIdAPI({
        articleId: favoriteArticle.articleId || "",
        favoriteArticleFolderId,
      });
    if (resCount.data?.count && resCount.data.count > 0) {
      failToast({
        description: "You are already following the article",
      });
      return;
    }

    // 3. create favoriteArticle
    const createdData = await createFavoriteArticle({
      userId: user?.id || "",
      favoriteArticleFolderId: favoriteArticleFolderId,
      articleId: favoriteArticle.articleId || "",
      platformId: favoriteArticle.platformId || undefined,
      title: favoriteArticle.title,
      description: favoriteArticle.description,
      articleUrl: favoriteArticle.articleUrl,
      publishedAt: favoriteArticle.publishedAt || undefined,
      authorName: favoriteArticle.authorName || undefined,
      tags: favoriteArticle.tags || undefined,
      thumbnailURL: favoriteArticle.thumbnailURL || undefined,
      platformName: favoriteArticle.platformName || undefined,
      platformUrl: favoriteArticle.platformUrl || undefined,
      platformFaviconUrl: favoriteArticle.platformFaviconUrl || undefined,
      isEng: favoriteArticle.isEng,
      isRead: favoriteArticle.isRead,
      isPrivate: favoriteArticle.isPrivate,
    });

    if (!createdData) {
      failToast({
        description: "Failed to follow the article",
      });
      return;
    }
    successToast({
      description: "Followed the article",
    });

    setIsFollowing(true);

    return createdData.id;
  }, [failToast, successToast, user, favoriteArticle, favoriteArticleFolderId]);

  const handleRemoveFavoriteArticle = useCallback(
    async (favoriteArticleId: string) => {
      // check count favoriteArticle by favoriteArticleId
      const res = await fetchFavoriteArticleAPI(favoriteArticleId);
      if (!res.data) {
        failToast({
          description: "Failed to unfollow the article",
        });
        return;
      }
      if (!user) {
        failToast({
          description: "Please login to unfollow the article",
        });
        return;
      }
      // delete favoriteArticle
      const id = await deleteFavoriteArticle({
        id: favoriteArticleId,
        userId: user.id,
      });
      if (!id) {
        failToast({
          description: "Failed to unfollow the article",
        });
        return;
      }
      successToast({
        description: "Successfully unfollowed the article",
      });

      setIsFollowing(false);

      return id;
    },
    [successToast, failToast, user]
  );
  return (
    <div
      key={favoriteArticle.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div className="border-t-4 border-t-rose-600">
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={faviconImageUrl}
                alt=""
              />
              <span className="font-bold">{favoriteArticle.platformName}</span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={favoriteArticle.title}
                shareUrl={favoriteArticle.articleUrl}
              />
            </div>
            <div>
              {isFollowing ? (
                <RemoveFavoriteArticleAlertDialog
                  favoriteArticleId={favoriteArticle.id}
                  favoriteArticleTitle={favoriteArticle.title}
                  handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                />
              ) : (
                <AddFavoriteArticleTooltip
                  handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                />
              )}
            </div>
          </div>
        </div>

        <FavoriteArticleDetailSheet
          favoriteArticleFolderId={favoriteArticleFolderId}
          favoriteArticle={favoriteArticle}
        >
          <FavoriteArticleCard favoriteArticle={favoriteArticle} />
        </FavoriteArticleDetailSheet>
      </div>
    </div>
  );
};
