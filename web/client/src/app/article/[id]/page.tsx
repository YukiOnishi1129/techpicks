import { Suspense } from "react";

import { ArticleDetailTemplate } from "@/features/articles/components/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type ArticleDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = params;
  return (
    <Suspense fallback={<ScreenLoader />}>
      <ArticleDetailTemplate id={id} />
    </Suspense>
  );
}
