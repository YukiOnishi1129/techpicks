import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { MyFeedFolderListTemplate } from "@/features/myFeeds/components/Template";

import { SearchParamsType } from "@/shared/types/utils";

type PageProps = {
  searchParams: Promise<SearchParamsType>;
};

export default async function MyFeedFolderListPage({
  searchParams,
}: PageProps) {
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
    <MyFeedFolderListTemplate keywordList={keywordList} searchParams={q} />
  );
}
