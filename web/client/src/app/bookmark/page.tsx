import { Suspense } from "react";

import { BookmarkListTemplate } from "@/features/bookmarks/components/BookmarkListTemplate";

import { ScreenLoader } from "@/components/layout/ScreenLoader/ScreenLoader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Bookmark({ searchParams }: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : undefined;

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  let platformIdList: Array<string> = [];

  if (
    typeof searchParams["platformId"] !== "string" &&
    searchParams["platformId"]
  )
    platformIdList = searchParams["platformId"];

  if (typeof searchParams["platformId"] === "string")
    platformIdList.push(searchParams["platformId"]);

  return (
    <Suspense fallback={<ScreenLoader />}>
      <BookmarkListTemplate
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
      />
    </Suspense>
  );
}
