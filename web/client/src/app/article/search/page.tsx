import { ArticleSearchTemplate } from "@/features/search/components/articles/ArticleSearchTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchArticlePage({ searchParams }: PageProps) {
  return <ArticleSearchTemplate />;
}
