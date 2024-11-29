import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { AllFolderFavoriteArticleListTemplate } from "@/features/favorites/components";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type FavoriteArticleAllListPageeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoriteArticleAllListPage({
  searchParams,
}: FavoriteArticleAllListPageeProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return (
    <Suspense fallback={<ScreenLoader />}>
      <AllFolderFavoriteArticleListTemplate user={user} keyword={keyword} />
    </Suspense>
  );
}
