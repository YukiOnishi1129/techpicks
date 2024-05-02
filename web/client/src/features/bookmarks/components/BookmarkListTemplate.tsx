import { FC } from "react";

import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { BookmarkSearchDialog } from "@/features/search/components/bookmarks/Dialog";
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
        <h1 className="mt-8 text-2xl font-bold  md:mb-4">Bookmark</h1>
        <div className=" flex w-48 items-center justify-end">
          <div className="mr-12 hidden cursor-pointer md:block">
            <BookmarkSearchDialog platforms={platforms} />
          </div>
          <div className="mr-8 hidden min-w-24 md:block">
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

      <div className="mb-4 flex items-center justify-end md:hidden">
        <div className="mr-12 cursor-pointer">
          <BookmarkSearchDialog platforms={platforms} />
        </div>
        <div className="mr-8 min-w-24">
          <BookmarkLanguageSwitch
            languageStatus={languageStatus}
            keyword={keyword}
          />
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
