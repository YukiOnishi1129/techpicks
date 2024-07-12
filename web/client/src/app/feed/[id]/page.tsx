import { Suspense } from "react";

import { FeedDetailTemplate } from "@/features/feeds/components/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

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
  return (
    <Suspense fallback={<ScreenLoader />}>
      <FeedDetailTemplate id={id} keyword={keyword} />
    </Suspense>
  );
}
