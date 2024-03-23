import { getArticles } from "@/features/articles/repository/article";
import Link from "next/link";
import { ArticleCard } from "@/features/articles/components/ArticleCard";

export default async function Home() {
  const articles = await getArticles({
    // offset: 3,
  });
  return (
    <div className="w-[90%] h-auto mt-4 mx-auto border-2 grid grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
