import { redirect } from "next/navigation";
import { Suspense } from "react";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DashboardSummaryPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
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

  const tab =
    typeof searchParams["tab"] === "string" ? searchParams["tab"] : "trend";

  return (
    <>
      <Suspense fallback={<ScreenLoader />}>
        <HomeTemplate
          languageStatus={languageStatus}
          keyword={keyword}
          platformIdList={platformIdList}
          tab={tab}
        />
      </Suspense>
    </>
  );
}
