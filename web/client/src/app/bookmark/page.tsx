import { Loader } from "lucide-react";
import { Suspense } from "react";

import { BookmarkListTemplate } from "@/features/bookmarks/components/BookmarkListTemplate";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Bookmark({ searchParams }: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 1;

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
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <BookmarkListTemplate
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
      />
    </Suspense>
  );
}
