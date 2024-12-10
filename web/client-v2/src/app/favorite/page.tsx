import { redirect } from "next/navigation";

// import { FavoriteArticleFolderListTemplate } from "@/features/favoriteArticleFolders/components/Template";
// import { getUser } from "@/features/users/actions/user";
import { getUser } from "@/features/auth/actions/user";
import { FavoriteArticleFolderListTemplate } from "@/features/favorites/components/Template";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoritePage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <FavoriteArticleFolderListTemplate keyword={keyword} />;
}
