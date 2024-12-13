import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FeedListTemplate } from "@/features/feeds/components/Template";

import { convertPlatformSiteType } from "@/lib/convert";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FeedListPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformSiteType =
    typeof searchParams["platformSiteType"] === "string" &&
    !Number.isNaN(Number(searchParams["platformSiteType"]))
      ? convertPlatformSiteType(searchParams["platformSiteType"])
      : undefined;

  const platformId =
    typeof searchParams["platformId"] === "string"
      ? searchParams["platformId"]
      : undefined;

  return (
    <FeedListTemplate
      keyword={keyword}
      platformSiteType={platformSiteType}
      platformId={platformId}
    />
  );
}
