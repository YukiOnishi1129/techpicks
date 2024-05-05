import { redirect } from "next/navigation";

import { BookmarkSearchResultTemplate } from "@/features/search/components/bookmarks/BookmarkSearchResultTemplate";
import { getUser } from "@/features/users/actions/user";

import { LanguageStatus } from "@/types/language";
import { PlatformType } from "@/types/platform";

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

  const platformType =
    typeof searchParams["platformType"] === "string"
      ? (parseInt(searchParams["platformType"]) as PlatformType)
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
    <BookmarkSearchResultTemplate
      user={user}
      languageStatus={languageStatus}
      keyword={keyword}
      platformType={platformType}
      platformIdList={platformIdList}
    />
  );
}
