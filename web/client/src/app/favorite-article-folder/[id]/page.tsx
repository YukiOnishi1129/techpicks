import { FavoriteArticleFolderDetailTemplate } from "@/features/favoriteArticleFolders/components/FavoriteArticleFolderDetailTemplate";

type FavoriteArticleFolderDetailPageProps = {
  params: {
    id: string;
  };
};

export default function FavoriteArticleFolderDetailPage({
  params,
}: FavoriteArticleFolderDetailPageProps) {
  const { id } = params;
  return <FavoriteArticleFolderDetailTemplate id={id} />;
}
