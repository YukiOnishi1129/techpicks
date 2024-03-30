import { Suspense } from "react";

import { ArticleListTemplate } from "@/features/articles/components/ArticleListTemplate";

import { Loader } from "@/components/ui/loader";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 1;

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ArticleListTemplate languageStatus={languageStatus} />
      </Suspense>
    </>
  );
}
