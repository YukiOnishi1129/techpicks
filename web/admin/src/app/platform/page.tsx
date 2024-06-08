import { PlatformTemplate } from "@/features/platforms/components/PlatformTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PlatformPage({ searchParams }: PageProps) {
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

  const status =
    typeof searchParams["status"] === "string"
      ? searchParams["status"]
      : undefined;

  return (
    <PlatformTemplate
      offset={offset}
      keyword={keyword}
      language={language}
      platformSiteType={platformSiteType}
      status={status}
    />
  );
}
