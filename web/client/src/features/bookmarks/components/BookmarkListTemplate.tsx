import { FC } from "react";

import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";

import { BookmarkList } from "./BookmarkList";
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
    <>
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
    </>
  );
};