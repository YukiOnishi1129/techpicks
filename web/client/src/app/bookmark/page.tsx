import { redirect } from "next/navigation";
import { Suspense } from "react";

import { BookmarkTemplate } from "@/features/bookmarks/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader/ScreenLoader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Bookmark({ searchParams }: PageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

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
      <BookmarkTemplate
        user={user}
        languageStatus={languageStatus}
        keyword={keyword}
        platformIdList={platformIdList}
      />
    </Suspense>
  );
}
