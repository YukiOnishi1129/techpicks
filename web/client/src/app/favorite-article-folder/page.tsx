import { FavoriteArticleFolderListTemplate } from "@/features/favoriteArticleFolders/components/FavoriteArticleFolderListTemplate";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FavoriteArticleFolderPage({ searchParams }: PageProps) {
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <FavoriteArticleFolderListTemplate keyword={keyword} />;
}
