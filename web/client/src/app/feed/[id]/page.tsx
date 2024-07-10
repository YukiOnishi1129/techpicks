import { FeedDetailTemplate } from "@/features/feeds/components/Template";

type FeedDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FeedDetailPage({
  params,
  searchParams,
}: FeedDetailPageProps) {
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <FeedDetailTemplate id={id} keyword={keyword} />;
}
