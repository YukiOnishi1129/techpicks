import { redirect } from "next/navigation";

import { MyFeedFolderListTemplate } from "@/features/myFeedFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MyFeedFolderFolderListPage({
  searchParams,
}: PageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;

  return <MyFeedFolderListTemplate user={user} keyword={keyword} />;
}
