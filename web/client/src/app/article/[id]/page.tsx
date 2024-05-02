import { ArticleDetailTemplate } from "@/features/articles/components/ArticleDetailTemplate";

type ArticleDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = params;
  return <ArticleDetailTemplate id={id} />;
}
