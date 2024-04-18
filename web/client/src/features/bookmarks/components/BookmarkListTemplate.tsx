import { FC } from "react";

import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";

import { BookmarkList } from "./BookmarkList";
import { CreateBookmarkDialog } from "./Dialog";
import { BookmarkLanguageSwitch } from "./Switch";
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
  const res = await fetchBookmarkListAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformIdList,
  });
  const user = await getUser();
  return (
    <div className="w-auto">
      <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Read Later</h1>
      <CreateBookmarkDialog user={user} languageStatus={languageStatus} />
      <div className="w-full border-b-2 bg-white py-4">
        <BookmarkLanguageSwitch
          languageStatus={languageStatus}
          keyword={keyword}
        />
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
