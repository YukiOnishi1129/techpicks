import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { FeedArticleListTemplate } from "@/features/feeds/components/Template";

import { SearchParamsType } from "@/shared/types/utils";

type FeedByIdPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParamsType>;
};

export default async function FeedByIdPage({
  params,
  searchParams,
}: FeedByIdPageProps) {
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
    <FeedArticleListTemplate
      id={id}
      keywordList={keywordList}
      searchParams={q}
    />
  );
}
