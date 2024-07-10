import { redirect } from "next/navigation";

import { MyFeedFolderDetailTemplate } from "@/features/myFeedFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

type MyFeedFolderDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MyFeedFolderDetailPage({
  params,
  searchParams,
}: MyFeedFolderDetailPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const { id } = params;
  const keyword =
    typeof searchParams["keyword"] === "string"
      ? searchParams["keyword"]
      : undefined;
  return <MyFeedFolderDetailTemplate user={user} id={id} keyword={keyword} />;
}
