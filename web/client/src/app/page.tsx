import { ArticleListTemplate } from "@/features/articles/components/ArticleListTemplate";
import { getArticles } from "@/features/articles/repository/article";

import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 0;
  const articles = await getArticles({ languageStatus });
  return (
    <ArticleListTemplate
      initialArticles={articles}
      languageStatus={languageStatus}
      fetchArticles={getArticles}
    />
  );
}
