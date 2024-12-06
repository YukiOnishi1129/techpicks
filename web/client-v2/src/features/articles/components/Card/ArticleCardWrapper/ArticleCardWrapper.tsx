"use client";

import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { useBookmarkMutation } from "@/features/articles/hooks/useBookmarkMutation";
import { useFavoriteArticleMutation } from "@/features/articles/hooks/useFavoriteArticleMutation";
import { FollowFavoriteArticleDropdownMenu } from "@/features/favorites/components/DropdownMenu";

import { IconTitleLink } from "@/components/ui/link";
import { ShareLinks } from "@/components/ui/share";

import { ArticleTabType } from "@/types/article";

import style from "./ArticleCardWrapper.module.css";
import {
  ArticleCardWrapperFragment,
  FavoriteFolderArticleCardWrapperFragment,
} from "./ArticleCardWrapperFragment";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "../../ToolTip";
import { ArticleCardItem } from "../ArticleCardItem";

type ArticleCardWrapperProps = {
  data: FragmentOf<typeof ArticleCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderArticleCardWrapperFragment
  >;
  user: User;
  tab: ArticleTabType;
};

const TREND_TAB = "trend";

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  data,
  favoriteArticleFolders,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  const fragment = readFragment(ArticleCardWrapperFragment, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderArticleCardWrapperFragment,
    favoriteArticleFolders
  );

  const { handleCreateBookmark, handleDeleteBookmark } = useBookmarkMutation({
    data: fragment,
  });

  const {
    handleCreateFavoriteArticle,
    handleRemoveFavoriteArticle,
    handleCreateFavoriteArticleFolder,
  } = useFavoriteArticleMutation({
    data: fragment,
    favoriteArticleFolders: fragmentFavoriteFolder,
  });

  return (
    <div
      key={fragment.id}
      className="rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2"
    >
      <div className="grid gap-4">
        <div className="flex h-16 justify-between border-b-2 py-4 md:px-6">
          <>
            <div className="flex">
              {tab === TREND_TAB && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${fragment.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {tab !== TREND_TAB ? (
                <IconTitleLink
                  url={fragment.platform?.siteUrl || ""}
                  iconImageUrl={fragment.platform?.faviconUrl || ""}
                  title={fragment.platform?.name || ""}
                  target="_blank"
                />
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={fragment.platform?.faviconUrl || ""}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4">
              <div>
                <ShareLinks
                  shareTitle={fragment.title}
                  shareUrl={fragment.articleUrl}
                />
              </div>

              <>
                {fragment?.bookmarkId ? (
                  <DeleteBookmarkTooltip
                    bookmarkId={fragment?.bookmarkId || ""}
                    handleRemoveBookmark={handleDeleteBookmark}
                  />
                ) : (
                  <AddBookmarkTooltip
                    handleAddBookmark={handleCreateBookmark}
                  />
                )}
                <div className="mt-2">
                  <FollowFavoriteArticleDropdownMenu
                    data={fragmentFavoriteFolder}
                    isFollowing={fragment.isFollowing}
                    followedFolderIds={fragment.favoriteArticleFolderIds || []}
                    handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                    handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                    handleCreateFavoriteArticleFolder={
                      handleCreateFavoriteArticleFolder
                    }
                  />
                </div>
              </>
            </div>
          </>
        </div>

        <div>
          <ArticleCardItem data={fragment} user={user} tab={tab} />
        </div>
      </div>
    </div>
  );
};
