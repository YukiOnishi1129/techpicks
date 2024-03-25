import { ArticleList } from "@/features/articles/components/ArticleList";
import { getArticles } from "@/features/articles/repository/article";

export default async function Home() {
  const articles = await getArticles({});
  return <ArticleList initialArticles={articles} fetchArticles={getArticles} />;
}
