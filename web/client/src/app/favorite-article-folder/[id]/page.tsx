import { FavoriteArticleFolderDetailTemplate } from "@/features/favoriteArticleFolders/components/FavoriteArticleFolderDetailTemplate";

type FavoriteArticleFolderDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function FavoriteArticleFolderDetailPage({
  params,
  searchParams,
}: FavoriteArticleFolderDetailPageProps) {
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <FavoriteArticleFolderDetailTemplate id={id} keyword={keyword} />;
}
