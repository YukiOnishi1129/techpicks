import { fetchArticleAPI } from "@/features/articles/actions/article";
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
  const articles = await fetchArticleAPI({
    languageStatus: languageStatus.toString(),
    offset: "1",
  });

  return (
    <>
      {articles && (
        <ArticleListTemplate
          initialArticles={articles}
          languageStatus={languageStatus}
          fetchArticles={fetchArticleAPI}
        />
      )}
    </>
  );
}
