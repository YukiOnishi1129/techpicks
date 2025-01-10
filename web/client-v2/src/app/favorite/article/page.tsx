import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { AllFolderFavoriteArticleListTemplate } from "@/features/favorites/components";

import { SearchParamsType } from "@/shared/types/utils";

type FavoriteArticleAllListPageeProps = {
  searchParams: Promise<SearchParamsType>;
};

export default async function FavoriteArticleAllListPage({
  searchParams,
}: FavoriteArticleAllListPageeProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const q = await searchParams;
  let keywordList: Array<string> = [];
  if (typeof q["keyword"] !== "string" && q["keyword"])
    keywordList = q["keyword"];
  if (typeof q["keyword"] === "string") keywordList.push(q["keyword"]);

  return (
    <AllFolderFavoriteArticleListTemplate
      keywordList={keywordList}
      searchParams={q}
    />
  );
}
