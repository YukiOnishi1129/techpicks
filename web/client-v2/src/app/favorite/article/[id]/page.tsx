import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { FavoriteArticleListByFolderIdTemplate } from "@/features/favorites/components";

import { ScreenLoader } from "@/shared/components/layout/ScreenLoader";

type FavoriteArticleListPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FavoriteArticleListPage({
  params,
  searchParams,
}: FavoriteArticleListPageProps) {
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
    <Suspense fallback={<ScreenLoader />}>
      <FavoriteArticleListByFolderIdTemplate
        user={user}
        id={id}
        keyword={keyword}
      />
    </Suspense>
  );
}
