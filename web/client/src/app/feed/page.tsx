import { FeedTemplate } from "@/features/feeds/components/FeedTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FeedListPage({ searchParams }: PageProps) {
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <FeedTemplate keyword={keyword} />;
}
