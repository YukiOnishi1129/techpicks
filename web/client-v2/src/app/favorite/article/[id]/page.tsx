import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FavoriteArticleListByFolderIdTemplate } from "@/features/favorites/components";

import { SearchParamsType } from "@/shared/types/utils";

type FavoriteArticleListPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParamsType>;
};

export default async function FavoriteArticleListPage({
  params,
  searchParams,
}: FavoriteArticleListPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = await params;
  const q = await searchParams;

  const keyword = typeof q["keyword"] === "string" ? q["keyword"] : undefined;

  return (
    <FavoriteArticleListByFolderIdTemplate
      id={id}
      keyword={keyword}
      searchParams={q}
    />
  );
}
