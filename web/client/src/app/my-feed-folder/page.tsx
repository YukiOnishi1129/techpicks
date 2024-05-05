import { redirect } from "next/navigation";

import { MyFeedFolderListTemplate } from "@/features/myFeedFolders/components/MyFeedFolderListTemplate";
import { getUser } from "@/features/users/actions/user";

export default async function MyFeedFolderFolderListPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return <MyFeedFolderListTemplate user={user} />;
}
