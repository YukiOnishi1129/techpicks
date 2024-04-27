import { FC } from "react";

import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { ArticleSearchDialog } from "@/features/search/components/articles/Dialog";
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
  const platforms = await fetchPlatformAPI({
    languageStatus: "0",
  });
  const user = await getUser();
  return (
    <div className="w-auto">
      <div className="mb-4 flex w-full items-end justify-between px-4">
        <h1 className="mb-4 mt-8 text-2xl font-bold text-gray-800">Bookmark</h1>
        <div className="mb-4 flex w-48 items-center justify-end">
          <div className="mr-12 cursor-pointer">
            <ArticleSearchDialog platforms={platforms} />
          </div>
          <div className="mr-8 min-w-24">
            <BookmarkLanguageSwitch
              languageStatus={languageStatus}
              keyword={keyword}
            />
          </div>
          <div className="">
            <CreateBookmarkDialog user={user} languageStatus={languageStatus} />
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
