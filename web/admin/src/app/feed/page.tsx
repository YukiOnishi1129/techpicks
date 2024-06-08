import { FeedTemplate } from "@/features/feeds/components/FeedTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FeedPage({ searchParams }: PageProps) {
  const offset =
    typeof searchParams["offset"] === "string"
      ? parseInt(searchParams["offset"])
      : undefined;
  const language =
    typeof searchParams["language"] === "string"
      ? searchParams["language"]
      : undefined;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  const platformSiteType =
    typeof searchParams["platformSiteType"] === "string"
      ? searchParams["platformSiteType"]
      : undefined;

  const platformId =
    typeof searchParams["platformId"] === "string"
      ? searchParams["platformId"]
      : undefined;

  const categoryId =
    typeof searchParams["categoryId"] === "string"
      ? searchParams["categoryId"]
      : undefined;
  const trendPlatformType =
    typeof searchParams["trendPlatformType"] === "string"
      ? searchParams["trendPlatformType"]
      : undefined;

  const status =
    typeof searchParams["status"] === "string"
      ? searchParams["status"]
      : undefined;

  return (
    <FeedTemplate
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
      platformId={platformId}
      categoryId={categoryId}
      trendPlatformType={trendPlatformType}
      status={status}
    />
  );
}
