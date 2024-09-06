"use client";
import { User } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useMemo, useState } from "react";

import { ArticleTabType } from "@/types/article";

import style from "./ArticleCardWrapper.module.css";
import { ArticleCardWrapperFragment } from "./fragment";
import { ArticleCardItem } from "../ArticleCardItem";

type ArticleCardWrapperProps = {
  data: FragmentOf<typeof ArticleCardWrapperFragment>;
  //   favoriteArticleFolders: Array<FavoriteArticleFolderType>;
  user: User | undefined;
  tab: ArticleTabType;
};

export const ArticleCardWrapper: FC<ArticleCardWrapperProps> = ({
  data,
  user,
  tab,
}: ArticleCardWrapperProps) => {
  //   const { successToast, failToast } = useStatusToast();
  //   const [isFollowing, setIsFollowing] = useState<boolean>(
  //     article.isFollowing || false
  //   );
  const fragment = readFragment(ArticleCardWrapperFragment, data);
  const [showArticle, setShowArticle] = useState(fragment);
  //   const [showFavoriteArticleFolders, setShowFavoriteArticleFolders] = useState<
  //     Array<FavoriteArticleFolderType>
  //   >(favoriteArticleFolders);

  //   const { bookmarkId, handleAddBookmark, handleRemoveBookmark } =
  //     useArticleBookmark({ article });

  const isShowLikeCount = useMemo(
    () => fragment?.likeCount !== undefined,
    [fragment?.likeCount]
  );

  return (
    <div
      key={showArticle.id}
      className="mb-4 rounded-2xl border-2 bg-primary-foreground px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <>
            <div className="flex">
              {tab === "trend" && (
                <div
                  className={clsx(style["like-count"], "mr-4 text-rose-600")}
                >
                  <span className="text-4xl font-bold">{`${showArticle.likeCount}`}</span>
                  <span className="ml-2 font-bold">{"likes"}</span>
                </div>
              )}

              {tab !== "trend" ? (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 inline-block size-[36px] bg-white"
                    src={showArticle.platform?.faviconUrl || ""}
                    alt=""
                  />
                  <span className="hidden font-bold md:inline-block">
                    {showArticle.platform?.name || ""}
                  </span>
                </div>
              ) : (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mr-2 hidden size-[36px] bg-white md:inline-block"
                    src={showArticle.platform?.faviconUrl || ""}
                    alt=""
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="mr-4">
                {/* <ShareLinks
                  shareTitle={showArticle.title}
                  shareUrl={showArticle.articleUrl}
                /> */}
              </div>
            </div>
          </>
        </div>

        <ArticleCardItem data={showArticle} user={user} tab={tab} />
      </div>
    </div>
  );
};
