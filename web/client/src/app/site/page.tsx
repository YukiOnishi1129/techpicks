import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ArticleListTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SitePage({ searchParams }: PageProps) {
  const user = await getUser();
  if (user) {
    redirect("/dashboard/trend");
  }
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 2;

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  let feedIdList: Array<string> = [];

  if (typeof searchParams["feedId"] !== "string" && searchParams["feedId"])
    feedIdList = searchParams["feedId"];

  if (typeof searchParams["feedId"] === "string")
    feedIdList.push(searchParams["feedId"]);

  return (
    <Suspense fallback={<ScreenLoader />}>
      <ArticleListTemplate
        languageStatus={languageStatus}
        keyword={keyword}
        feedIdList={feedIdList}
        tab={"site"}
      />
    </Suspense>
  );
}
