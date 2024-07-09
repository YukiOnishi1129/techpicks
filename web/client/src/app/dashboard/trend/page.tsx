import { redirect } from "next/navigation";
import { Suspense } from "react";

import { TrendDashboardTemplate } from "@/features/trendArticles/components/TrendDashboardTemplate";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TrendDashboardPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 2;

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

  const tab =
    typeof searchParams["tab"] === "string" ? searchParams["tab"] : "english";

  return (
    <>
      <Suspense fallback={<ScreenLoader />}>
        <TrendDashboardTemplate
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
        />
      </Suspense>
    </>
  );
}
