import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { AllFolderFavoriteArticleListTemplate } from "@/features/favorites/components";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";

type FavoriteArticleAllListPageeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function FavoriteArticleAllListPage({
  searchParams,
}: FavoriteArticleAllListPageeProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const q = await searchParams;
  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  return (
    <Suspense fallback={<ScreenLoader />}>
      <AllFolderFavoriteArticleListTemplate user={user} keyword={keyword} />
    </Suspense>
  );
}
