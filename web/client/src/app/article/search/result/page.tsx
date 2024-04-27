import { fetchPlatformAPI } from "@/features/platforms/actions/platform";
import { ArticleSearchResultTemplate } from "@/features/search/components/articles/ArticleSearchResultTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ArticleSearchResultPage({
  searchParams,
}: PageProps) {
  const platforms = await fetchPlatformAPI({});

  return <ArticleSearchResultTemplate />;
}
