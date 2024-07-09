import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { BookmarkArticleKeywordSearchInput } from "@/features/search/components/bookmarks/BookmarkArticleKeywordSearchInput";
import { BookmarkSearchKeywordDialogFloatButton } from "@/features/search/components/bookmarks/Dialog";

import { LanguageStatus } from "@/types/language";

import { BookmarkList } from "./BookmarkList";
import {
  CreateBookmarkDialog,
  CreateBookmarkDialogFloatButton,
} from "./Dialog";
import { fetchBookmarkListAPI } from "../actions/bookmark";

type BookmarkListTemplateProps = {
  user: User;
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const BookmarkListTemplate: FC<BookmarkListTemplateProps> = async ({
  user,
  languageStatus,
  keyword,
  platformIdList,
}) => {
  const res = await fetchBookmarkListAPI({
    languageStatus: languageStatus?.toString() || undefined,
    keyword,
    platformIdList,
  });
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});
  return (
    <div className="w-auto">
      <div className="mb-4 mt-8 hidden w-full items-center justify-between px-4 md:flex">
        <h1 className="mr-8 hidden text-2xl font-bold  md:mb-4 md:block">
          Bookmark
        </h1>
        <div className="mr-2 w-3/4 md:mr-4">
          <BookmarkArticleKeywordSearchInput />
        </div>

        <CreateBookmarkDialog user={user} />
      </div>

      <BookmarkList
        user={user}
        initialBookmarks={res.data.bookmarks}
        favoriteArticleFolders={
          resFavoriteArticleFolders.data.favoriteArticleFolders
        }
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
        fetchBookmarks={fetchBookmarkListAPI}
      />

      <div className="fixed bottom-20 right-4 z-50  md:hidden">
        <div>
          <BookmarkSearchKeywordDialogFloatButton />
        </div>
        <div className="mt-8">
          <CreateBookmarkDialogFloatButton user={user} />
        </div>
      </div>
    </div>
  );
};
