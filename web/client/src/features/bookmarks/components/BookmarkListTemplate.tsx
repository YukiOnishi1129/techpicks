import { FC } from "react";

import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";

import { BookmarkLanguageTabMenu } from "./BookmarkLanguageTabMenu";
import { BookmarkList } from "./BookmarkList";
import { CreateBookmarkDialog } from "./CreateBookmarkDialog";
import { fetchBookmarkListAPI } from "../actions/bookmark";

type ArticleListProps = {
  languageStatus: LanguageStatus;
  keyword?: string;
  platformIdList: Array<string>;
};

export const BookmarkListTemplate: FC<ArticleListProps> = async ({
  languageStatus,
  keyword,
  platformIdList,
}: ArticleListProps) => {
  const bookmarks = await fetchBookmarkListAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
  });
  const user = await getUser();
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Read Later</h1>
      <CreateBookmarkDialog user={user} />
      <div className="w-full border-b-2 bg-white py-4">
        <BookmarkLanguageTabMenu
          languageStatus={languageStatus}
          keyword={keyword}
        />
      </div>
      {languageStatus === 1 && (
        <BookmarkList
          user={user}
          initialBookmarks={bookmarks}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          fetchBookmarks={fetchBookmarkListAPI}
        />
      )}
      {languageStatus === 2 && (
        <BookmarkList
          user={user}
          initialBookmarks={bookmarks}
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          fetchBookmarks={fetchBookmarkListAPI}
        />
      )}
    </div>
  );
};
