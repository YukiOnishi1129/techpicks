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
  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

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
      keyword={keyword}
      platformSiteType={platformSiteType}
      platformId={platformId}
    />
  );
}
