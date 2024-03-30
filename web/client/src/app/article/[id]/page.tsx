import { ArticleDetail } from "@/features/articles/components/ArticleDetail";
import { getArticleById } from "@/features/articles/repository/article";

type ArticleDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const article = await getArticleById(params.id);
  return <ArticleDetail article={article} />;
}
