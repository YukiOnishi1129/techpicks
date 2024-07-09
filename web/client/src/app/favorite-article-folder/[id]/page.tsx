import { redirect } from "next/navigation";

import { FavoriteArticleFolderDetailTemplate } from "@/features/favoriteArticleFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

type FavoriteArticleFolderDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoriteArticleFolderDetailPage({
  params,
  searchParams,
}: FavoriteArticleFolderDetailPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return (
    <FavoriteArticleFolderDetailTemplate
      user={user}
      id={id}
      keyword={keyword}
    />
  );
}
