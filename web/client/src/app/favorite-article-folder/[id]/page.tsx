import { redirect } from "next/navigation";
import { Suspense } from "react";

import { FavoriteArticleFolderDetailTemplate } from "@/features/favoriteArticleFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

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
    <Suspense fallback={<ScreenLoader />}>
      <FavoriteArticleFolderDetailTemplate
        user={user}
        id={id}
        keyword={keyword}
      />
    </Suspense>
  );
}
