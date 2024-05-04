import { FC } from "react";

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
      <div className="mb-4 flex w-full items-end justify-between px-4">
        <h1 className="mt-8 text-2xl font-bold  md:mb-4">Bookmark</h1>
        <div className=" flex w-48 items-center justify-end">
          <div className="">
            <CreateBookmarkDialog user={user} />
          </div>
        </div>
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
