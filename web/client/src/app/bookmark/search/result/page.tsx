import { redirect } from "next/navigation";
import { Suspense } from "react";

import { BookmarkSearchResultTemplate } from "@/features/search/components/bookmarks/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { LanguageStatus } from "@/types/language";
import { PlatformSiteType } from "@/types/platform";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BookmarkSearchResultPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 1;

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformSiteType =
    typeof searchParams["platformSiteType"] === "string"
      ? (parseInt(searchParams["platformSiteType"]) as PlatformSiteType)
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
      <BookmarkSearchResultTemplate
        user={user}
        languageStatus={languageStatus}
        keyword={keyword}
        platformSiteType={platformSiteType}
        platformIdList={platformIdList}
      />
    </Suspense>
  );
}
