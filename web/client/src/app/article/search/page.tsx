import { ArticleSearchForm } from "@/features/articles/components/ArticleSearchForm";
import { fetchPlatformAPI } from "@/features/platforms/actions/platform";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchArticlePage({ searchParams }: PageProps) {
  const platforms = await fetchPlatformAPI({});

  return (
    <div>
      <h1>Search Article Page</h1>
      <ArticleSearchForm platforms={platforms} />
    </div>
  );
}
