"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { ShareLinks } from "@/components/ui/share";

import {
  BookmarkCardWrapperFragment,
  FavoriteFolderBookmarkCardWrapperFragment,
} from "./BookmarkCardWrapperFragment";
import { DeleteBookmarkAlertDialog } from "../../Dialog";
import { BookmarkCardItem } from "../BookmarkCardItem";

type BookmarkCardWrapperProps = {
  data: FragmentOf<typeof BookmarkCardWrapperFragment>;
  favoriteArticleFolders: FragmentOf<
    typeof FavoriteFolderBookmarkCardWrapperFragment
  >;
  user: User;
};

export const BookmarkCardWrapper: FC<BookmarkCardWrapperProps> = ({
  data,
  favoriteArticleFolders,
  user,
}) => {
  const fragment = readFragment(BookmarkCardWrapperFragment, data);
  const fragmentFavoriteFolder = readFragment(
    FavoriteFolderBookmarkCardWrapperFragment,
    favoriteArticleFolders
  );

  return (
    <div
      key={fragment.id}
      className="mb-4 rounded-2xl border-2 px-4 pb-4 md:px-2 md:pb-2"
    >
      <div>
        <div className="mb-4 flex h-16 justify-between border-b-2 py-4 md:ml-6">
          <div className="flex">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mr-2 inline-block size-[36px]"
                src={fragment.platformFaviconUrl}
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
            <DeleteBookmarkAlertDialog
              bookmarkId={fragment.id}
              bookmarkTitle={fragment.title}
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

        <BookmarkCardItem data={fragment} />
      </div>
    </div>
  );
};
