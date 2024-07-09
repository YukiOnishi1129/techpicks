import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { fetchBookmarkListAPI } from "@/features/bookmarks/actions/bookmark";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { BookmarkArticleKeywordSearchInput } from "@/features/search/components/bookmarks/BookmarkArticleKeywordSearchInput";
import { BookmarkSearchKeywordDialogFloatButton } from "@/features/search/components/bookmarks/Dialog";

import { LanguageStatus } from "@/types/language";

import {
  CreateBookmarkDialog,
  CreateBookmarkDialogFloatButton,
} from "../Dialog";
import { BookmarkList } from "../List";

type BookmarkTemplateProps = {
  user: User;
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const BookmarkTemplate: FC<BookmarkTemplateProps> = async ({
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
    <div>
      <div className="fixed z-10  hidden  w-[90%]  items-center  justify-between bg-card md:flex md:w-[70%] md:px-4">
        <h1 className="my-4 mr-8 hidden text-2xl font-bold  md:mb-4 md:block">
          Bookmark
        </h1>
        <div className="mr-2 w-3/4 md:mr-4">
          <BookmarkArticleKeywordSearchInput />
        </div>
        <CreateBookmarkDialog user={user} />
      </div>
      <div className="h-4 md:h-16" />

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
          <BookmarkSearchKeywordDialogFloatButton keyword={keyword} />
        </div>
        <div className="mt-8">
          <CreateBookmarkDialogFloatButton user={user} />
        </div>
      </div>
    </div>
  );
};
