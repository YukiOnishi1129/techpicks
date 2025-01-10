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

  let keywordList: Array<string> = [];
  if (typeof q["keyword"] !== "string" && q["keyword"])
    keywordList = q["keyword"];
  if (typeof q["keyword"] === "string") keywordList.push(q["keyword"]);

  return (
    <FavoriteArticleListByFolderIdTemplate
      id={id}
      keywordList={keywordList}
      searchParams={q}
    />
  );
}
