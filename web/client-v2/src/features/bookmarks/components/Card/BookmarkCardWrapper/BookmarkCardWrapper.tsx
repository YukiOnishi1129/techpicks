"use client";
import { User } from "@supabase/supabase-js";
import { FragmentOf, readFragment } from "gql.tada";
import { FC } from "react";

import { IconTitleLink } from "@/components/ui/link";
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
      className="rounded-2xl border bg-primary-foreground px-4 pb-4 md:px-2"
    >
      <div className="grid gap-4">
        <div className="flex h-16 justify-between border-b py-4 md:px-6">
          <IconTitleLink
            url={fragment.platformUrl}
            title={fragment.platformName}
            iconImageUrl={fragment.platformFaviconUrl}
            target="_blank"
          />

          <div className="flex items-center justify-center gap-4">
            <div>
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

        <div>
          <BookmarkCardItem data={fragment} />
        </div>
      </div>
    </div>
  );
};
