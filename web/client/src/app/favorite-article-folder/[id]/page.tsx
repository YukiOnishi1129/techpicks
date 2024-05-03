import { FavoriteArticleFolderListTemplate } from "@/features/favoriteArticleFolders/components/FavoriteArticleFolderListTemplate";

type FavoriteArticleFolderDetailPageProps = {
  params: {
    id: string;
  };
};

export default function FavoriteArticleFolderDetailPage({
  params,
}: FavoriteArticleFolderDetailPageProps) {
  const { id } = params;
  return <FavoriteArticleFolderListTemplate />;
}
