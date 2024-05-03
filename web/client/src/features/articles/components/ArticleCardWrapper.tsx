"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FC, useMemo, useState } from "react";
import { TwitterShareButton, XIcon } from "react-share";

import { ReadPostTooltip } from "@/components/ui/tooltip/ReadPostTooltip";

import { ArticleTabType, ArticleType } from "@/types/article";

import { ArticleCard } from "./ArticleCard";
import style from "./ArticleCardWrapper.module.css";
import { ArticleDetailSheet } from "./ArticleDetailSheet";
import { FollowFavoriteArticleDropdownMenu } from "./DropdownMenu";
import { AddBookmarkTooltip, DeleteBookmarkTooltip } from "./Tooltip";
import { useArticleBookmark } from "../hooks/useArticleBookmark";

type ArticleCardWrapperProps = {
  article: ArticleType;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  article,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(
    article.isFollowing || false
  );
  const [showArticle, setShowArticle] = useState<ArticleType>(article);

  const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
    useArticleBookmark({ article });

  const isShowLikeCount = useMemo(
    () => article?.likeCount !== undefined,
    [article?.likeCount]
  );

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/article/${article.id}`;

  return (
    <div
      key={showArticle.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div className="border-t-4 border-t-rose-600">
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <>
            <div className="flex">
              {isShowLikeCount && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${showArticle.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {showArticle?.likeCount === undefined ? (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 inline-block size-[36px] bg-white"
                    src={showArticle.platform.faviconUrl}
                    alt=""
                  />
                  <span className="hidden font-bold md:inline-block">
                    {showArticle.platform.name}
                  </span>
                </div>
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={showArticle.platform.faviconUrl}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-2 md:mr-4">
                <ReadPostTooltip postUrl={showArticle.articleUrl} size={24} />
              </div>
              <div className="mr-2 md:mr-4">
                <TwitterShareButton title={showArticle.title} url={shareUrl}>
                  <XIcon className="inline-block" size={36} />
                </TwitterShareButton>
              </div>

              {user && (
                <>
                  {bookmarkId ? (
                    <DeleteBookmarkTooltip
                      bookmarkId={bookmarkId}
                      handleRemoveBookmark={handleRemoveBookmark}
                    />
                  ) : (
                    <AddBookmarkTooltip
                      articleId={showArticle.id}
                      handleAddBookmark={handleAddBookmark}
                    />
                  )}
                  <div className="mx-2  md:ml-4">
                    <FollowFavoriteArticleDropdownMenu
                      isFollowing={isFollowing}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        </div>

        <ArticleDetailSheet article={showArticle} user={user}>
          <ArticleCard article={showArticle} user={user} tab={tab} />
        </ArticleDetailSheet>
      </div>
    </div>
  );
};
