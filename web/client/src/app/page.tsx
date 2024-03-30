import { ArticleListTemplate } from "@/features/articles/components/ArticleListTemplate";

import { Article } from "@/types/article";
import { LanguageStatus } from "@/types/language";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getArticleApi = async ({
  languageStatus,
  offset,
}: {
  languageStatus: string;
  offset: string;
}) => {
  "use server";
  const response = await fetch(
    `http://localhost:80/api/articles/?offset=${offset}&languageStatus=${languageStatus}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const data = await response.json();

  return data.articles as Article[];
};

export default async function Home({ searchParams }: PageProps) {
  const languageStatus =
    typeof searchParams["languageStatus"] === "string"
      ? (parseInt(searchParams["languageStatus"]) as LanguageStatus)
      : 1;
  const articles = await getArticleApi({
    languageStatus: languageStatus.toString(),
    offset: "1",
  });

  return (
    <>
      {articles && (
        <ArticleListTemplate
          initialArticles={articles}
          languageStatus={languageStatus}
          fetchArticles={getArticleApi}
        />
      )}
    </>
  );
}
