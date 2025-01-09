import { redirect } from "next/navigation";

import { SearchArticleListTemplate } from "@/features/articles/components/Template";
import { getUser } from "@/features/auth/actions/user";

import { ArticleTabType } from "@/shared/types/article";
import { LanguageStatus } from "@/shared/types/language";
import { PlatformSiteType } from "@/shared/types/platform";
import { SearchParamsType } from "@/shared/types/utils";

type PageProps = {
  searchParams: Promise<SearchParamsType>;
};

export default async function SearchArticleListPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const q = await searchParams;
  const languageStatus =
    typeof q["languageStatus"] === "string"
      ? (parseInt(q["languageStatus"]) as LanguageStatus)
      : 0;

  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  const platformSiteType =
    typeof q["platformSiteType"] === "string"
      ? (parseInt(q["platformSiteType"]) as PlatformSiteType)
      : undefined;

  let feedIdList: Array<string> = [];
  if (typeof q["feedId"] !== "string" && q["feedId"]) feedIdList = q["feedId"];

  if (typeof q["feedId"] === "string") feedIdList.push(q["feedId"]);

  const tab =
    typeof q["tab"] === "string" ? (q["tab"] as ArticleTabType) : "unknown";

  return (
    <SearchArticleListTemplate
      searchParams={q}
      languageStatus={languageStatus}
      keyword={keyword}
      platformSiteType={platformSiteType}
      feedIdList={feedIdList}
      tab={tab}
    />
  );
}
