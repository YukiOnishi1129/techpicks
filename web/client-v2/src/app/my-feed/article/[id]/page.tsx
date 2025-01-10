import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { MyFeedFolderArticleListTemplate } from "@/features/myFeeds/components/Template";

import { SearchParamsType } from "@/shared/types/utils";

type MyFeedFolderArticleListPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParamsType>;
};

export default async function MyFeedFolderArticleListPage({
  params,
  searchParams,
}: MyFeedFolderArticleListPageProps) {
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
    <MyFeedFolderArticleListTemplate
      myFeedFolderId={id}
      keywordList={keywordList}
      searchParams={q}
    />
  );
}
