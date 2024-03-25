import { getArticles } from "@/features/articles/repository/article";
import { ArticleList } from "@/features/articles/components/ArticleList";

export default async function Home() {
  const articles = await getArticles({});
  return <ArticleList initialArticles={articles} fetchArticles={getArticles} />;
}
