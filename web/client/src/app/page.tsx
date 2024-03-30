import { ArticleList } from "@/features/articles/components/ArticleList";
import { getArticles } from "@/features/articles/repository/article";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: PageProps) {
  const articles = await getArticles({ languageStatus: 1 });
  return <ArticleList initialArticles={articles} fetchArticles={getArticles} />;
}
