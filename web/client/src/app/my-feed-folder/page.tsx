import { redirect } from "next/navigation";
import { Suspense } from "react";

import { MyFeedFolderListTemplate } from "@/features/myFeedFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

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

  return (
    <Suspense fallback={<ScreenLoader />}>
      <MyFeedFolderListTemplate user={user} keyword={keyword} />
    </Suspense>
  );
}
