import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { BookmarkTemplate } from "@/features/bookmarks/components/Template";

import { SearchParamsType } from "@/shared/types/utils";

type PageProps = {
  searchParams: Promise<SearchParamsType>;
};

export default async function BookmarkPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const q = await searchParams;

  let keywordList: Array<string> = [];
  if (typeof q["keyword"] !== "string" && q["keyword"])
    keywordList = q["keyword"];
  if (typeof q["keyword"] === "string") keywordList.push(q["keyword"]);

  return <BookmarkTemplate keywordList={keywordList} searchParams={q} />;
}
