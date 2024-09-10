"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC, useState } from "react";

import { ShareLinks } from "@/components/ui/share";

import { useStatusToast } from "@/hooks/useStatusToast";

import { BookmarkCardWrapperFragment } from "./BookmarkCardWrapperFragment";
import { DeleteBookmarkAlertDialog } from "../../Dialog";
import { BookmarkCardItem } from "../BookmarkCardItem";

type BookmarkCardWrapperProps = {
  data: FragmentOf<typeof BookmarkCardWrapperFragment>;
  user: User;
};

export const BookmarkCardWrapper: FC<BookmarkCardWrapperProps> = ({
  data,
  user,
}) => {
  const { successToast, failToast } = useStatusToast();
  const fragment = readFragment(BookmarkCardWrapperFragment, data);

  const [showBookmark, setShowBookmark] = useState(fragment);

  return (
    <div
      key={showBookmark.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={showBookmark.platformFaviconUrl}
                alt=""
              />
              <span className="hidden font-bold md:inline-block">
                {showBookmark.platformName}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="mr-4">
              <ShareLinks
                shareTitle={showBookmark.title}
                shareUrl={showBookmark.articleUrl}
              />
            </div>
            <DeleteBookmarkAlertDialog
              bookmarkId={showBookmark.id}
              bookmarkTitle={showBookmark.title}
            />
            <div className="ml-4">
              {/* <FollowFavoriteArticleDropdownMenu
                isFollowing={isFollowing}
                articleId={showBookmark.articleId || ""}
                favoriteArticleFolders={showFavoriteArticleFolders}
                handleCreateFavoriteArticle={handleCreateFavoriteArticle}
                handleRemoveFavoriteArticle={handleRemoveFavoriteArticle}
                handleCreateFavoriteArticleFolder={
                  handleCreateFavoriteArticleFolder
                }
              /> */}
            </div>
          </div>
        </div>

        <BookmarkCardItem data={showBookmark} />
      </div>
    </div>
  );
};
