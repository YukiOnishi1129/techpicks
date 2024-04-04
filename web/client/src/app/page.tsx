import { Loader } from "lucide-react";
import { Suspense } from "react";

import { ArticleListTemplate } from "@/features/articles/components/ArticleListTemplate";

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

  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ArticleListTemplate
          languageStatus={languageStatus}
          keyword={keyword}
        />
      </Suspense>
    </>
  );
}
