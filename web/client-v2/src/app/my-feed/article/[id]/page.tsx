import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions/user";

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
  return <div>MyFeedFolder Article List</div>;
}
