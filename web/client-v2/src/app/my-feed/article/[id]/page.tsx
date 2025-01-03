import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";
import { MyFeedFolderArticleListTemplate } from "@/features/myFeeds/components/Template/MyFeedFolderArticleListTemplate";

type MyFeedFolderArticleListPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MyFeedFolderArticleListPage({
  params,
  searchParams,
}: MyFeedFolderArticleListPageProps) {
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
    <MyFeedFolderArticleListTemplate myFeedFolderId={id} keyword={keyword} />
  );
}
