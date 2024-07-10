import { redirect } from "next/navigation";

import { FavoriteArticleFolderListTemplate } from "@/features/favoriteArticleFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoriteArticleFolderPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <FavoriteArticleFolderListTemplate user={user} keyword={keyword} />;
}
