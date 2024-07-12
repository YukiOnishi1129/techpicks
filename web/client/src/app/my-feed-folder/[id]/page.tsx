import { redirect } from "next/navigation";
import { Suspense } from "react";

import { MyFeedFolderDetailTemplate } from "@/features/myFeedFolders/components/Template";
import { getUser } from "@/features/users/actions/user";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

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
  return (
    <Suspense fallback={<ScreenLoader />}>
      <MyFeedFolderDetailTemplate user={user} id={id} keyword={keyword} />
    </Suspense>
  );
}
