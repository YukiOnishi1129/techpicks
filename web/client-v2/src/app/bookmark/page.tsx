import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getUser } from "@/features/auth/actions/user";
import { BookmarkTemplate } from "@/features/bookmarks/components/Template";

import { ScreenLoader } from "@/components/layout/ScreenLoader";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BookmarkPage({ searchParams }: PageProps) {
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
      <BookmarkTemplate user={user} keyword={keyword} />
    </Suspense>
  );
}
