import { PlatformTemplate } from "@/features/platform/components/PlatformTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PlatformPage({ searchParams }: PageProps) {
  const offset =
    typeof searchParams["offset"] === "string"
      ? parseInt(searchParams["offset"])
      : undefined;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <PlatformTemplate offset={offset} keyword={keyword} />;
}
