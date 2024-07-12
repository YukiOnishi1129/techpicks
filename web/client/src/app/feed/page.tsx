import { Suspense } from "react";

import { FeedTemplate } from "@/features/feeds/components/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FeedListPage({ searchParams }: PageProps) {
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <FeedTemplate keyword={keyword} />
    </Suspense>
  );
}
