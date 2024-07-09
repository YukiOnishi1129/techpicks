import { User } from "@supabase/supabase-js";
import { FC } from "react";

import { fetchBookmarkListAPI } from "@/features/bookmarks/actions/bookmark";
import { BookmarkList } from "@/features/bookmarks/components/List/BookmarkList";
import { fetchFavoriteArticleFoldersAPI } from "@/features/favoriteArticleFolders/actions/favoriteArticleFolders";
import { fetchPlatformAPI } from "@/features/platforms/actions/platform";

import { BreadCrumbType, PageBreadcrumb } from "@/components/ui/breadcrumb";

import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

import { BookmarkSearchDialog } from "../Dialog";

export type BookmarkSearchResultTemplateProps = {
  user: User;
  languageStatus: LanguageStatus;
  keyword?: string;
  platformSiteType?: PlatformSiteType;
  platformIdList: Array<string>;
};

export const BookmarkSearchResultTemplate: FC<
  BookmarkSearchResultTemplateProps
> = async ({
  user,
  languageStatus,
  keyword,
  platformSiteType,
  platformIdList,
}) => {
  const res = await fetchBookmarkListAPI({
    languageStatus: languageStatus.toString(),
    keyword,
    platformSiteType: String(platformSiteType),
    platformIdList,
  });
  const platforms = await fetchPlatformAPI({
    languageStatus: languageStatus.toString(),
    platformSiteType: String(platformSiteType),
  });
  const resFavoriteArticleFolders = await fetchFavoriteArticleFoldersAPI({});

  let keywordPath = "";
  if (!!keyword && keyword.trim() !== "") {
    keywordPath = `&keyword=${keyword}`;
  }
  let platformTypePath = "";
  if (String(platformSiteType)) {
    platformTypePath = `&platformSiteType=${String(platformSiteType)}`;
  }
  let platformIdPath = "";
  if (platformIdList.length) {
    platformIdPath = platformIdList
      .map((platformId) => `&platformId=${platformId}`)
      .join("");
  }

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: "Bookmark",
      href: "/bookmark/",
    },
    {
      title: "Bookmark Search Result",
      href: `/bookmark/search/result/?languageStatus=${languageStatus.toString()}${keywordPath}${platformTypePath}${platformIdPath}`,
    },
  ];
  return (
    <div>
      <div className="mb-2 mt-4">
        <PageBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="my-8 flex w-full items-center justify-between ">
        <h1 className="text-2xl font-bold ">Bookmark Search Result</h1>
        <div className="mr-8 flex w-48 items-center justify-end">
          <BookmarkSearchDialog
            platforms={platforms}
            languageStatus={languageStatus}
            keyword={keyword}
            platformSiteType={platformSiteType}
            platformIdList={platformIdList}
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
        favoriteArticleFolders={
          resFavoriteArticleFolders.data.favoriteArticleFolders
        }
      />
    </div>
  );
};
