import { Suspense } from "react";

import { ArticleSearchTemplate } from "@/features/search/components/articles/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

export default async function SearchArticlePage() {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <ArticleSearchTemplate />
    </Suspense>
  );
}
