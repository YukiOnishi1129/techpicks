import { FeedDetailTemplate } from "@/features/feeds/components/FeedDetailTemplate";

type FeedDetailPageProps = {
  params: {
    id: string;
  };
};

export default function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { id } = params;
  return <FeedDetailTemplate id={id} />;
}
