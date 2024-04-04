import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { SearchForm } from "@/features/search/components/SearchForm";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchArticlePage({ searchParams }: PageProps) {
  const platforms = await fetchPlatformAPI({});

  return (
    <div>
      <h1>Search Article Page</h1>
      <SearchForm platforms={platforms} />
    </div>
  );
}
