import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FavoriteArticleFolderListTemplate } from "@/features/favorites/components/Template";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FavoritePage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const q = await searchParams;
  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  return <FavoriteArticleFolderListTemplate keyword={keyword} />;
}
