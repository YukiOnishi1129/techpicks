import { FC } from "react";

import { BookmarkArticleKeywordSearchInput } from "@/features/search/components/bookmarks/BookmarkArticleKeywordSearchInput";
import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";

import { BookmarkList } from "./BookmarkList";
import { CreateBookmarkDialog } from "./Dialog";
import { fetchBookmarkListAPI } from "../actions/bookmark";

type ArticleListProps = {
  languageStatus?: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const BookmarkListTemplate: FC<ArticleListProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: ArticleListProps) => {
  const res = await fetchBookmarkListAPI({
    languageStatus: languageStatus?.toString() || undefined,
    keyword,
    platformIdList,
  });
  const user = await getUser();
  return (
    <div className="w-auto">
      <div className="mb-4 mt-8 flex w-full items-center justify-between px-4">
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
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
        fetchBookmarks={fetchBookmarkListAPI}
      />
    </div>
  );
};
