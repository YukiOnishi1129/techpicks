import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FeedListTemplate } from "@/features/feeds/components/Template";

import { convertPlatformSiteType } from "@/shared/lib/convert";
import { SearchParamsType } from "@/shared/types/utils";

type PageProps = {
  searchParams: Promise<SearchParamsType>;
};

export default async function FeedListPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const q = await searchParams;
  let keywordList: Array<string> = [];
  if (typeof q["keyword"] !== "string" && q["keyword"])
    keywordList = q["keyword"];
  if (typeof q["keyword"] === "string") keywordList.push(q["keyword"]);

  const platformSiteType =
    typeof q["platformSiteType"] === "string" &&
    !Number.isNaN(Number(q["platformSiteType"]))
      ? convertPlatformSiteType(q["platformSiteType"])
      : undefined;

  const platformId =
    typeof q["platformId"] === "string" ? q["platformId"] : undefined;

  return (
    <FeedListTemplate
      searchParams={q}
      keywordList={keywordList}
      platformSiteType={platformSiteType}
      platformId={platformId}
    />
  );
}
