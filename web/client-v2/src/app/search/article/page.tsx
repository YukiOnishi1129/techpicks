import { redirect } from "next/navigation";

import { SearchArticleListTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/auth/actions/user";

import { ArticleTabType } from "@/shared/types/article";
import { LanguageStatus } from "@/shared/types/language";
import { PlatformSiteType } from "@/shared/types/platform";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchArticleListPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 0;

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformSiteType =
    typeof searchParams["platformSiteType"] === "string"
      ? (parseInt(searchParams["platformSiteType"]) as PlatformSiteType)
      : undefined;

  let feedIdList: Array<string> = [];
  if (typeof searchParams["feedId"] !== "string" && searchParams["feedId"])
    feedIdList = searchParams["feedId"];

  if (typeof searchParams["feedId"] === "string")
    feedIdList.push(searchParams["feedId"]);

  const tab =
    typeof searchParams["tab"] === "string"
      ? (searchParams["tab"] as ArticleTabType)
      : "unknown";

  return (
    <SearchArticleListTemplate
      languageStatus={languageStatus}
      keyword={keyword}
      platformSiteType={platformSiteType}
      feedIdList={feedIdList}
      tab={tab}
    />
  );
}
